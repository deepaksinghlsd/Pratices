import {useEffect} from 'react'
import { requestForToken } from '../firebase/messageUser'
import { auth } from '../firebase/firebaseConfig'
import MessageSender from '../components/MessageSender'
import MessageList from '../components/MessageList'
const MessagerUser = () => {
  const userId = auth.currentUser.uid 
  console.log(userId);
  useEffect(() => {
    requestForToken(userId)
  },[userId])
     
  return (
  <div className='p-4'>
    <h1 className='text-xl font-bold'>Messaging</h1>
    <MessageSender senderId={userId} />
    <MessageList userId={userId} />
  </div>
  )
}

export default MessagerUser