import React from 'react';
import './ReturnProcess.css';

const ReturnProcess = () => {
    const steps = [
        {
            number: '1',
            title: 'Submit Request',
            description: 'Submit your request using the form above.'
        },
        {
            number: '2',
            title: 'Approval & Label',
            description: 'Receive approval and your prepaid return label (when applicable).'
        },
        {
            number: '3',
            title: 'Ship Back',
            description: 'Ship the item back in its original packaging.'
        },
        {
            number: '4',
            title: 'Inspection & Processing',
            description: 'Refunds and exchanges are typically processed within 3–5 business days after receipt.'
        }
    ];

    return (
        <section className="return-process">
            <h2>Return & Exchange Process</h2>
            <div className="process-steps">
                {steps.map((step, index) => (
                    <div key={index} className="step-item">
                        <div className="step-number">{step.number}</div>
                        <div className="step-content">
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                        {index < steps.length - 1 && <div className="step-connector"></div>}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ReturnProcess;
