import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <p>Kontakt os på: <a href="mailto:oliverbhareskov@gmail.com">oliverbhareskov@gmail.com</a></p>
            <div className="socials">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://x.com/Spi0nDK" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
        </footer>
    );
};

export default Footer;
