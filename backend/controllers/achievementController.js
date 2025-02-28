const User = require("../models/user")

const grant =  async (req, res) => {
    const { userId, achievementId } = req.body;
    
    try {
        const user = await User.findById(userId);
        if (!user.achievements.includes(achievementId)) {
            user.achievements.push(achievementId);
            await user.save();
        }
       return  res.status(200).json({ message: 'Conquista atribuída com sucesso!' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao conceder conquista' });
    }
}
module.exports = {
    grant
}