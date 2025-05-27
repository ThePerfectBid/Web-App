import './FormCard.css'

export default function FormCard(params:any) {
    return(
        <div className="paragraph-overlay">
            <div className="heading-sign-in">{params.cardTitle}</div>
            <p className="text-wrapper" >{params.text}</p>
        </div>
    );
}