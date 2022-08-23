import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'
import './ChatList.css'

const ChatList = ({chanData}) => {



    return(

        <div className="Channels-headers">
            <div>
                 CHANNELS   
            </div>
            <div>
            <FontAwesomeIcon icon={faPlus} />
            </div>
            <div>
            {chanData.map((room, i) => <div key={i}>
                <p>{room}</p>
                </div>)}
            </div>
            
        </div>

    )
}

export default ChatList