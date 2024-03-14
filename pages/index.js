import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Home() {
  // Card data could also be fetched from an API or a database
  const cards = [
    {
      id: 1,
      imgSrc: '/trophy.jpg',
      title: 'The Daily',
      description: 'Compete against your friends.',
      buttonText: 'Play'
    },
    {
      id: 2,
      imgSrc: '/lecture.jpg',
      title: 'Chapter Review',
      description: 'Vocab from the last class lecture.',
      buttonText: 'Play'
    },
    {
      id: 3,
      imgSrc: '/study.jpg',
      title: 'Tricky Ones',
      description: 'Practice ones you missed in the past.',
      buttonText: 'Play'
    }
  ];

  const router = useRouter();

  const buttonPressed = () => {
    router.push('/puzzle');
  }

  return (
    <main className='index-background'>
    <div className='front-page-container'>
      <Head>
        <title>Anatomy Crossword</title>
      </Head>

      <main>
        <h1 className='front-page-title'>Anatomy Crosswords</h1>
        <div className='front-page-cardsContainer'>
          {cards.map((card) => (
            <div key={card.id} className='front-page-card'>
            <Image
              className='front-page-cardImage'
              src={card.imgSrc}
              alt="Image description"
              width={300} // Adjusted to match the original image's aspect ratio
              height={450} // Adjusted to match the original image's aspect ratio
              layout="responsive"
              quality={75} // Optionally adjust for better quality
            />

              <div className='front-page-cardContent'>
                <div className='front-page-cardTitle'>{card.title}</div>
                <p className='front-page-cardDescription'>
                  {card.description}
                </p>
                <button onClick={buttonPressed} className='front-page-button'>
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
    </main>
  );
}
