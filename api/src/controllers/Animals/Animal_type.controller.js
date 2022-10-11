const {Animal_type, Animal} = require('../../db');

const errorVar = {
    err: 500,
    message: 'Something went wrong...',
}
let mock = [
    {
        name:'Dog',
    },
    {
        name:'Cat',
    },
    {
        name:'Rodent',
    },
    {
        name:'Other',
    }
]
//
const emptyDB = {
    err: 'Database is empty'
}

mock.forEach(type => {
    return async function() {
        try{
            await Animal_type.create({
                name: type.name
            })
        } catch {

        }
    }
});

async function getAllTypes(req, res) {
    
    try {
        let types = await Animal_type.findAll({
            include: Animal
        })
        res.status(200).send(types)
    } catch(error) {
        console.log(error)
    }
    
    
}

function writeAnimalTypes(){
    
    console.log('+ Writing animal types into database...')
    return Animal_type.bulkCreate(mock)
    .then(()=>{console.log('- Wrote animal types into database.')})
    .catch((e)=>{console.log('An error occurred while animal types: ',e)})
}

module.exports={
    writeAnimalTypes,
    getAllTypes
}