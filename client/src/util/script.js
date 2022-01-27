const loadBing = (callback) => {
    const existingScript = document.getElementById('bingapi')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = `${process.env.REACT_APP_B_SITE_KEY}`
      script.id = 'bingapi'
      document.body.appendChild(script)
      script.onload = () => { 
        if (callback) callback()
      }
    }
    if (existingScript && callback) callback()
  }
  export default loadBing