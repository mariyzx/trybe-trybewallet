import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        Desenvolvido por
        {' '}
        <a href="http://github.com/mariyzx" rel="noopener noreferrer" target="_blank">Mariana Werneck</a>
        {' '}
        em 2022.
      </div>
    );
  }
}

export default Footer;
