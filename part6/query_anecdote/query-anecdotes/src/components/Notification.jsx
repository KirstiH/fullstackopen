import { useContext } from 'react'
import { useNotificationValue } from '../notificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notification = useNotificationValue()

  if (notification === null) {
    return null
  }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )

}

export default Notification
