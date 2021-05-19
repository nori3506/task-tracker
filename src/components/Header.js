import PropTypes from 'prop-types';
import Button from './button'

const Header = ({ title }) => {
  const onClick = () => {
    console.log("aaa")
  }

  return (
    <header className='header'>
      <h1> {title} </h1>
      <Button onClick={onClick} color='green' text='Hello' />
    </header>
  )
}


Header.defaultProps = {
  title: "task Tracker"
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

// const headingStyle = {
//   color: 'red', backgroundColor: 'black'
// }

export default Header
