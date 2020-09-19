import styled from 'styled-components'

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-top: 1px solid #A8A8A8;
  text-align: left;
  padding: 30px 0 45px 0;
  flex-wrap: wrap;
  @media (min-width: 410px) {
    flex-direction: row;
    align-items: flex-start;
    
  }`

export const Content = styled.div`
  width: 33%;
  margin: 15px 0;
  > * {
    font-size: 12px;
    margin: 10px 0;
  }
/* background-color: #333; */
@media (min-width: 410px) {
    width: 30%;
    > * {
    font-size: 14px;
    margin: 10px 0;
  }
  }
`
export const SocialMedia = styled.div`
  width: 33%;
  margin: 15px 0;
  > * {
    font-size: 12px;
    margin: 10px 2px;
  }
  
  @media (min-width: 410px) {
    text-align: center;
    width: 20%;
    > * {
    font-size: 14px;
    margin: 10px 0;
  }
  }
/* background-color: #333; */
`
export const SocialIcon = styled.span`
  > * {
    width: 15px;
    height: 15px;
  }
`

export const Copy = styled.div`
  margin-top: 10px;
  width: 80%;
  text-align: center;
  font-size: 12px;
  color: #868686
`
