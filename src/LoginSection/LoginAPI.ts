import axios  from 'axios'

export async function SignInRequest (googleIdToken : string) {
    try {
        const response = await axios.post('https://localhost:4000/api/auth/signin',{
            tokenid: googleIdToken,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                
            }
        })
        .then((response)=> {
            console.log(response);
            //If response != 200 | 201 -> issues with sign up.
            
            //signed in successful.
        })
    } catch(error) {
        console.log(error);   
    }
}  