import styled from 'styled-components'

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-top: 1px solid #d9d9d9;
  text-align: left;
  padding: 30px 0 45px 0;
  flex-wrap: wrap;
  h5 {
    font-size: 1.2em;
    text-transform: uppercase;
  }
  @media (min-width: 410px) {
    flex-direction: row;
    align-items: flex-start;
  }
`

export const Content = styled.div`
  width: 65%;
  margin: 15px 0;
  > * {
    display: block;
    text-decoration: none;
    color: initial;
    font-size: 12px;
    margin: 10px 0;
  }
  a{
    font-weight: bold;
  }

  @media (min-width: 410px) {
    width: 30%;
    > * {
      font-size: 14px;
      margin: 10px 0;
    }
  }
`
export const SocialMedia = styled.div`
  width: 65%;
  h5{
   margin-block-end: 1em;
   margin-block-start: 1em; 
  }
  
  @media (min-width: 410px) {
    text-align: center;
    width: 20%;
  }
`

export const SocialIcon = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: 0 3px;
  svg {
    width: 100%;
    height: 100%;
  }
  @media (min-width: 640px) {
    width: 30px;
    height: 30px;
    margin: 0 10px;

  }
`

export const Copy = styled.div`
  margin-top: 10px;
  width: 80%;
  text-align: center;
  font-size: 12px;
  color: #868686;
`
