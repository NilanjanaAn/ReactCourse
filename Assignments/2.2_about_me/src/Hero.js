// Create component here to display the Basic information such as 
// Name: Email: Phone: Address:
// Make sure to include these in your code with semicolon
function Hero() {
    let name="Nilanjana Thakur";
    let email="nilanjana@google.com";
    let phone=9876543210;
    let address="ABC, xyz street.";
    return (
        <>
            <p className="name">Name: {name}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <p>Address: {address}</p>
        </>
    )
}

export default Hero;