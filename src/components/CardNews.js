import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { fetchNews } from '../services/API';

class CardNews extends React.Component {
  constructor() {
    super();
    this.state = {
      news: [],
      settings: {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2500,
        cssEase: 'linear',
      },
    };
  }

  componentDidMount() {
    fetchNews()
      .then((response) => {
        this.setState({ news: response });
      });
  }

  render() {
    const { news, settings } = this.state;

    if (news.length > 0) {
      return (
        <footer className="bg-white absolute inset-x-0 bottom-0">
          <div className="w-full px-4 py-8 sm:px-6 sm:py-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Últimas notícias economia
            </h2>
            {/* <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8"> */}
            <Slider { ...settings } className="">

              {news.map((n) => (
                <div className="group relative" key={ n.title }>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <Link to={ { pathname: n.url } } target="_blank">
                        <h3 className="text-sm text-gray-700">

                          {n.title}
                        </h3>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
            {/* </div> */}
          </div>
        </footer>
      );
    }

    return (
      <span className="bg-white absolute inset-x-0 bottom-0">CARREGANDO...</span>
    );
  }
}

export default CardNews;
