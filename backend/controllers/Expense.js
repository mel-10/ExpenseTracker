const ExpenseSchema=require("../models/ExpenseModel")

exports.addExpense = async(req,res) =>{
    const {title, amount, category, description, date}  = req.body

    const income= ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try{
        if(!title || !category || !description|| !date){
            return res.status(400).json({message:'All fields are required'})
        }
        if(amount<=0 || !amount === 'number'){
            return res.status(400).json({message:'AMount must be a positive number'})
        }
        await income.save()
        res.status(200).json({message:'Expense added'})
    } catch(error){
        res.status(500).json({message: 'Server error'})
    } 

    console.log(income)
}

exports.getExpense =async(req,res)=> {
    try{
        const incomes=await ExpenseSchema.find().sort({createdAt:-1})
        res.status(200).json(incomes)
    }catch{
        res.status(500).json({message:'Server error'})
    }
}

exports.deleteExpense =async(req,res)=> {
    const {id}= req.params;
    ExpenseSchema.findByIdAndDelete(id)
    .then((income)=>{
        res.status(200).json({message:'Expense deleted'})
    })
    .catch((err) =>{
        res.status(500).json({message:'Server error'})
    })

}
