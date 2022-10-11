const {Adoption_alta,User, Animal} = require('../../db');

const emptyDB = { err: "Database empty" };
const badReq = { err: "Bad request" };
const notFound = { err: "Not Found" };

async function deleteAlta(req, res) {
    let {altaid} = req.params
    if (!altaid) return res.status(400).send(badReq);
    try {
        let alta = await Adoption_alta.findOne({
            where: {
                id: altaid
            }
        })
        if(!alta) return res.status(404).send(notFound);
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function addAlta(req, res) {
    let {userId, name, description} = req.body
    if(
        ! userId || !name || !description
    ){
        return res.status(400).send(badReq)
    }
    try {
        const newRow = await Adoption_alta.create({
            name: name,
            description: description,
            include: User
        });
        const user = await User.findOne({ 
            where: {
                id: userId
            }
        });
        await user.addAdoption_alta(newRow);
        return res.status(201).send('Information uploaded succesfully');
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

async function getAltaDetail(req, res) {
    let {altaid} = req.params
    if (!altaid) return res.status(400).send(badReq);
    try {
        let alta = await Adoption_alta.findOne({
            where: {
                id: altaid
            },
            include: User
        })
        if(!alta) return res.status(404).send(notFound);
       
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function getAllAltas(req, res) {
    try {
        let altas = await Adoption_alta.findAll({
            include: [User, Animal]
    })
        if(!altas || altas.length<1) return res.status(404).send(emptyDB);
        return res.send(altas);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function setAltaAsRead(req, res) {
    let {altaid} = req.params
    if (!altaid) return res.status(400).send(badReq);
    try {
        let alta = Adoption_alta.findOne({
            where: {
                id: altaid
            },
        });
        alta.read = true;
        await alta.save()
        return res.status(200).send({success:"Alta set as read"});
    } catch (error) {
       
        return res.status(500).send(error);
    }
}

async function toggleImportantAlta(req,res){
    let {altaid} = req.params
    if(!altaid)return res.status(400).send(badReq);
    try {
        let alta = Adoption_alta.findOne({
            where: {
                id: altaid
            }
        });
        alta.isImportant = !alta.isImportant;
        await alta.save()
        return res.status(200).send({success:"Alta important status changed"});
    } catch (error) {
        
        return res.status(500).send(error);
    }
}

module.exports={
    addAlta,
    deleteAlta,
    getAllAltas,
    getAltaDetail,
    setAltaAsRead,
    toggleImportantAlta
}