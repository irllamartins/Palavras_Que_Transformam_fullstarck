
const moment = require("moment/moment")
const Text = require("../models/text")
const User = require("../models/user")

// vizualizar todos 
const loadAnnualRanking = async (req, res) => {
    try {

        // Calcula a data de um ano atrás
        const oneYearAgo =  moment().subtract(1, "year").startOf('day').toDate();

        // Busca no banco os textos criados nos últimos 12 meses
       const users = await Text.aggregate([
             { 
                 // Filtra textos do último ano
               $match: {created_at:  { $gte: oneYearAgo } } 
             }/*, 
           { 
                 // Agrupa por ID do usuário (garante IDs únicos)
               $group: { _id: "$user_id" } 
             }, 
             { 
                 // Mantém apenas os IDs
               $project: { _id: 1 } 
             }*/ 
           ]);
      //  console.log(oneYearAgo, "!", users)
        // console.log(users.map(user => user._id)); Retorna apenas os IDs

        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar os textos" });
    }

}

module.exports = {
    loadAnnualRanking
}