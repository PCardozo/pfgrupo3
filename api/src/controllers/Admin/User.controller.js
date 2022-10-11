
const {
    User, Inquery, Animal
} = require('../../db');

const emptyDB = { err: "Database empty" };
const badReq = { err: "Bad request" };
const notFound = { err: "Not Found" };

async function addUser(req, res) {
    let {email, password} = req.body;
    try {
        await User.create({
            email: email,
            password: password,
            include: [Inquery, Animal]
        })
        res.satus(201).send('User created correctly')

    } catch (error) {
        res.status(500).send(error)
    }
    
}

async function deleteUser(req, res) {
    let {id} = req.params
    if (!id) return res.status(400).send(badReq);
    try {
        let user = await User.findOne({
            where: {
                id: id
            }
        })
        await user.destroy()
        if(!user) return res.status(404).send(notFound);
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function updateUser(req, res) {
    
    let {id, email, password,phone_number,location} = req.body
    try {
        let user = await User.findOne({
            where: {
                id: id
            }
        })
        if(user.length === 0 || !user) {
            return res.status(404).send(notFoundVar)
        } else {
            if(email)user.email = email
            if(password)user.password = password
            if(phone_number)user.phone_number = phone_number
            if(location)user.location = location
            user.save()
            return res.status(200).send('User Updated.')
        }
    } catch (error) {
        return res.status(500).send(errorVar)
    }
}

async function getUserDetail(req, res) {
    let {id} = req.params
    if (!id) return res.status(400).send(badReq);
    try {
        let user = await User.findOne({
            where: {
                id: id
            },
            include: Inquery
        })
        if(!user) return res.status(404).send(notFound);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function getAllUsers(req, res) {
    try {
        let users = await User.findAll({
            include: [Inquery, Animal]
        })
        if(!users || users.length<1) return res.status(500).send(emptyDB);
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function togglebanUser(req, res) {
    const {userid} = req.params;
    try {
        let user = await User.findOne({
            where: {
                id:userid
            }
        })
        if(!user) return res.status(404).send(notFound);
        if(user.isAdmin)return res.status(400).send({err:'Can not ban Admins. Remove admin privileges first.'});
        user.isBan = !user.isBan;
        await user.save
        return res.status(200).send({success:'User Ban status changed'});
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function toggleAdmin(req, res) {
    const {userid , selfid} = req.body;
    if(userid === selfid)res.status(400).send({err:"cant change your own status"});
    try {
        let user = await User.findOne({
            where: {
                id: userid
            }
        })
        if(!user) return res.status(404).send(notFound);
        user.isAdmin = !user.isAdmin;
        await user.save
        return res.status(200).send({success:'User Admin status changed'});
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports={
    addUser,
    deleteUser,
    getAllUsers,
    getUserDetail,
    toggleAdmin,
    togglebanUser,
    updateUser,
}