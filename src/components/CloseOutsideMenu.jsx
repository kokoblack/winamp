import {useRef, useEffect} from 'react'

export const CloseOutsideMenu = (callback) => {
    const ref= useRef();

    useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            callback();
          }
      };
  
      document.addEventListener('click', handleClick);
  
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, [ref]);
  
    return ref ;
}
export default CloseOutsideMenu