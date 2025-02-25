export const disableuser = async(userId , disable) => {
    try {
        const response = await fetch ("http://localhost:5000/disable-user", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"},
                body :JSON.stringify({uid:userId, disable}),
        });
        const data = await response.json();
        if(!data.succes) throw new Error(data.error);
        console.log(`user${disable ? "disabled" : "enable"} succesfully`);
        return true
        
    } catch (error) {
        console.error("error in :" , error.message)
        return false;
    }
}