import styled from "styled-components"

function MessegeItem({text,time,amIASender}) {

    if(amIASender){
        return (
            <Sender>
                <Msg>{text}</Msg><br/>
                <Time>{time}</Time>
              
            </Sender>
          )
    }else{
        return (
            <NotSender>
              <Msg>{text}</Msg><br/>
              <Time>{time}</Time>
            </NotSender>
          )

    }
  
}

export default MessegeItem

const Sender = styled.div`
    background-color: white;
    border-radius: 20px;
    padding: 10px;
    margin-left: auto;
    margin-right: 20px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
`;

const NotSender = styled.div`
    background-color: white;
    border-radius: 20px;
    padding: 10px;
    margin-right: auto;
    margin-left:20px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
   
`;

const Msg = styled.span`

`;

const Time = styled.span`
    font-size: .6rem;
    color: grey;
    margin-left: auto;
`;
