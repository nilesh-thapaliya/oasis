import React, { useState } from 'react'
import './FAQ.scss'
import aerodwn from '../../Assets/Home/arrow-down.png'
import aeroup from '../../Assets/Home/arrow-up.png'
const FAQ = () => {

    const Data = [
        {
            "srno": 1,
            "question": "What types of furniture do you offer?",
            "answer": `We offer a wide range of contemporary furniture including sofas, chairs, tables, beds, storage solutions, and outdoor furniture. Our collection is designed to suit modern aesthetics and functional needs.`

        }, {
            "srno": 2,
            "question": "Do you offer international shipping?",
            "answer": `We offer a wide range of contemporary furniture including sofas, chairs, tables, beds, storage solutions, and outdoor furniture. Our collection is designed to suit modern aesthetics and functional needs.`

        }, {
            "srno": 3,
            "question": "What is your return policy?",
            "answer": `We accept major credit cards (Visa, MasterCard, American Express), PayPal, and financing options through Affirm. All transactions are secure and encrypted.`

        }, {
            "srno": 4,
            "question": "What payment methods do you accept?",
            "answer": `We accept major credit cards (Visa, MasterCard, American Express), PayPal, and financing options through Affirm. All transactions are secure and encrypted.`

        }

    ]

    const [showans, setShowans] = useState(false);
    const [a, setA] = useState();
   



    return (

        <div className='faq-main'>
            <h2>We have got the answers to your questions</h2>

            <div className='acobox'>
                {Data.map((qa) => {
                    return (
                        <div className="que-ans">

                            <span className="qns"   onClick={() => { setA(qa.srno) || setShowans(!showans) }}
>
                                <h3>
                                    {qa.srno}.
                                </h3>
                                <h3
                                  
                                    className="question">

                                    {qa.question}
                                </h3>
                                <span 
                              
                                className='aero'> <img src={qa.srno===a?aerodwn:aeroup} alt="" /> </span>
                            </span>


                            {showans && a === qa.srno && <p className="answer">{qa.answer}</p>}
                        </div>
                    );
                })
                }
            </div>
        </div>
    )
}

export default FAQ
