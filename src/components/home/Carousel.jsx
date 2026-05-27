import BootstrapCarousel from "react-bootstrap/Carousel";

export default function HomeCarousel() {
  return (
    <BootstrapCarousel>
      <BootstrapCarousel.Item>
        <img
          className="d-block w-100"
          src="https://picsum.photos/1200/400?1"
          alt="Primeiro slide"
        />

        <BootstrapCarousel.Caption>
          <h3>Primeiro Slide</h3>
          <p>Descrição do primeiro slide.</p>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>

      <BootstrapCarousel.Item>
        <img
          className="d-block w-100"
          src="https://picsum.photos/1200/400?2"
          alt="Segundo slide"
        />

        <BootstrapCarousel.Caption>
          <h3>Segundo Slide</h3>
          <p>Descrição do segundo slide.</p>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>

      <BootstrapCarousel.Item>
        <img
          className="d-block w-100"
          src="https://picsum.photos/1200/400?3"
          alt="Terceiro slide"
        />

        <BootstrapCarousel.Caption>
          <h3>Terceiro Slide</h3>
          <p>Descrição do terceiro slide.</p>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>
    </BootstrapCarousel>
  );
}