const Faq = require("../models/modelFaq");
const { translate } = require("@vitalets/google-translate-api");


exports.getFaqs = async(req,res)=>{
    try{
        const {lang} = req.query;

        const faqs = await Faq.find();
        const faqsTranslate = faqs.map((faq) =>{
            if(lang && faq.translations.get(lang)){
                return {
                    question: faq.translations.get(lang).question,
                    answer: faq.translations.get(lang).answer
                };
            }else{ //  by default set to English
                return {
                    question: faq.question,
                    answer: faq.answer
                };
            }
        }) 
        res.json({
            success: true,
            data: faqsTranslate
        })

    }catch(err){
        console.log(err.message);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
};


exports.createFaqs = async(req,res)=>{
    try {
        const {question, answer} = req.body;
        if(!question || !answer){
            return res.status(400).json({
                success: false,
                message: "Question and Answer are required"
            })
        }

        const languages = ["hi","bn"];
        let translations = {};

        for(const lang of languages){
            const translatedQuestion = await translate(question, {from: "en", to: lang});
            const translatedAnswer = await translate(answer, {from: "en", to: lang});

            translations[lang] = {
                question: translatedQuestion.text,
                answer: translatedAnswer.text
            }
        }

        const newFaq = Faq.create({
            question,
            answer,
            translations
        });

        res.status(201).json({
            success: true,
            message: "Faq created successfully",
            data: newFaq
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
    });
    }
}