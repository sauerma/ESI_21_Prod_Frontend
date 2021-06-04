# ESI 2021 - Production - Frontend

This is the frontend git repository of team production. 

- URL to Production Page: https://master.d3a3d0dkip3odg.amplifyapp.com/
- URL to whole project: http://yourshirt.epizy.com/

## Demo

![](https://github.com/sauerma/ESI_21_Prod_Frontend/blob/Master/Production.gif)

# Get started
## - Create React App, Github and Amplify connection
1. Install <a href="https://nodejs.org/en/download/">Node.js</a>
2. Create a blanc React App in an individual folder with cmd-code: npx create-react-app amplifyapp
3. Push files in your github repository.
4. Go in your AWS account to 'AWS Amplify' and press 'Host web app'.
5. Connect Amplify with your github repository
6. Amplify automatically create an url. 

Read whole <a href="https://aws.amazon.com/de/getting-started/hands-on/deploy-react-app-cicd-amplify/">documentation</a>.

## - Connect React App with API Gateway
1. Go to your API Gateway method in your AWS account and copy your REST URL,</br> e.g. https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getplanningorders
2. Open CMD and navigate to your frontend directory. Install Axios: npm install axios
3. Go to your frontend code and import Axios in your js file:</br> <code>import axios from 'axios'</code></br>
4. Simply call your REST-Url, e.g. </br><code>
  function getPlanningOrders()
{
  axios.get('https://1ygz8xt0rc.execute-api.eu-central-1.amazonaws.com/main/getplanningorders').then(
    (res) => {
      console.log(res.data.body);
    }
  )
}</code>
<br></br>
If you got an error 'Has been blocked by CORS policy', then go to your REST Method in your API Gateway (AWS) and activate CORS.</br>
Don't forget to deploy API Gateway.

## Authors

- Julia Jillich
- David Krieg
- Evgeniya Puchkova
- Max Sauer




