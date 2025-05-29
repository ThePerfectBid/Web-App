import './ProfileElement.css'

interface ProfileElementProps {
  title: string
  content?: string
  icon: string
}

export default function ProfileElement({ title, content, icon }: ProfileElementProps) {
  return (
    <div className="profile-element">
      <div className="icon-element">
        <img src={icon} />
      </div>
      <div className="element-details">
        <p>{title}</p>
        <p>{content}</p>
      </div>
    </div>
  )
}
