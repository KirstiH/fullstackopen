const Notification = ({ notification }: { notification: string }) => {
  if (notification === null) {
    return null
  }
  
  const style = {
    padding: 10,
    borderWidth: 1,
    color: 'red'
  }

  return (
    <div style={style}>
      { notification }
    </div>
  )

}


export default Notification
