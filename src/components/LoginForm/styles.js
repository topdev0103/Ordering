import styled from 'styled-components'

export const LoginContainer = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: 1;
  flex-direction: row;
  min-width: auto;
  button{
    box-sizing: content-box;
  }

  .popup {
    font-size: 0.9em;
    input{
      width: 80%
    }
  }

  @media (max-width: 980px) {
    flex-direction: column;
    height: auto;
  }
`

/* export const Triangle = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    border: 100vw solid #d81212;
    border-right: 73vw solid #f8f8f8;
    background: white;
    box-sizing: border-box;
    padding: 0;
  @media (min-width: 480px) {
    width: 50%;
    max-width: 1000px;
    border: 250px solid #d81212;
    border-right: 25vh solid #f8f8f8;
  }
  */
/* &::after {
    content: "";
    height: 100%;
    width: 0;
    /* border: 10px solid #333; */
/* border-top: 50% solid transparent;
    border-bottom: 50% solid transparent;
     border-right:25vh solid blue;
  }
` */

export const HeroSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.primaryContrast};
  background: ${props => props.theme.colors.primary};
  z-index: 100;
  text-align: center;
  flex: 1.2;
  max-height: 100%;
  font-size: 1.7em;

  @media (max-width: 980px) {
    flex: 1;
    min-height: 300px;
  }
`

export const TitleHeroSide = styled.div`
  z-index: 10;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 1em;
  flex: 1.2;
  padding: 0 50px;
  @media (max-width: 980px) {
    flex: 1;
    padding: 0 10px;
  }
  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`

export const FormSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-around;
  padding: 30px 20px;
  flex: 1;
  width: 40%;
  height: auto;
  font-size: 1.2em;
  > img {
    margin-top: 0;
    width: 200px;
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.colors.primary};
  }
  &.popup{
    padding: 30px 0;
    padding-left: 5px;
  }
  @media (max-width: 980px) {
    font-size: 1em;
    height: 100%;
    width: 100%;
    > img {
      width: 139px;
      margin-bottom: 15px;
    }
  }
  
`

export const NewOnPlatform = styled.div`
  &.popup{
    font-size: 0.8em
    }
`

export const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: column;
  
  > * {
    color: ${props => props.theme.colors.primary}

    /*width: 42px;
    height: 42px;
    margin: 25px;
    border: 3px solid #d81212;
    border-radius: 100%;
    cursor: pointer;*/
  }
`

export const SocialButtons = styled.div`
   width: 100%;
   margin-top: 5px;
  > * {
    margin-top: 5px;
    margin-bottom: 20px;
    width: 55%;
    padding: 5px;
    color: black;
  }
  button{
      span{
        font-size: 0.8em;
      }
    }
  &.popup{
    button{
      width: 79%;
      span{
        padding-left: 10%;
      }
    }
  }

  @media (max-width: 1024px){
    > * {
      width: 80%;
    }
  }
  @media (max-width: 980px) {
    > * {
      margin-top: 5px;
      width: 55%;
    }
  }
`

export const LoginWith = styled.div`
  > div {
    justify-content: center;
  }
  font-size: 1.1em;

`

export const FormInput = styled.form`
  width: 100%;
  > * {
    margin: 10px;
    width: 55%;
    padding: 10px 20px
  }
  > button {
    margin-top: 10px;
    width: 60%;
    padding: 5px;
  }

  &.popup{
  > button{
      width: 85%
    }
  }
  @media (max-width: 1024px){
    > * {
      width: 80%;
    }
    button {
    width: 85%;
  }
  }
  @media (max-width: 980px) {
    > * {
      margin: 5px;
      width: 55%;
    }
    > button{
      width: 60%;
      box-sizing: border-box;
    }
  }
`

export const ForgotPassword = styled.div`
  margin: 10px auto;
  width: auto;
`
