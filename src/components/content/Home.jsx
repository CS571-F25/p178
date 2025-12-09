import dragonImg from '../../assets/littledragon_facingright.png'; 

export default function Home() {
  return (
    <div>
      <h1 tabIndex={-1}>BookWyrm Library</h1>

      <section aria-labelledby="banner-title" className="card-banner">
        <h2 id="banner-title" className="fs-2">Site Banner Placeholder</h2>
        <p className="text-white-50">Primary site image or graphic will go here.</p>
        <img
          src={dragonImg}
          alt="A majestic dragon guarding books"
          style={{ maxWidth: '100%', height: 'auto', marginTop: '1rem' }}
        />
      </section>

      <div>
        <h2><em>Where every book is a treasure!</em></h2>
      </div>
    </div>
  );
}
