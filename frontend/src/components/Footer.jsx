import './Footer.css'
export default function Footer() {
  return (
    <div className="f-info m-auto">
        <div className="f-info-socials">
            <i className="fa-brands fa-square-facebook"></i>
            <i className="fa-brands fa-square-instagram"></i>
            <i className="fa-brands fa-linkedin"></i>
        </div>
        <div className ="f-info-brand">&copy; MealGo Private Limited</div>
        <div className="f-info-links">
            <a href="/">Privacy &nbsp;</a>
            <a href="/">Terms</a>
        </div>
    </div>
  )
}
