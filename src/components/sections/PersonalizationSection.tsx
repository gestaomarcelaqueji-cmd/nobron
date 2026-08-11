"use client";

import Image from "next/image";
import {
  Check,
  ImageIcon,
  ImagePlus,
  LayoutTemplate,
  ListChecks,
  MessageCircle,
  MousePointer2,
  Palette,
  RotateCcw,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
} from "react";

import { WordHighlight } from "@/components/animations/WordHighlight";
import { Container } from "@/components/ui/Container";
import { RollingButton } from "@/components/ui/RollingButton";
import { whatsappMessages } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";

type HeroLayout = "split" | "banner";

type PaletteOption = {
  id: string;
  name: string;
  color: string;
  soft: string;
  contrast: string;
};

const personalizationHighlights = [
  {
    title: "Cores da marca",
    description: "Botões, fundos e destaques seguem a sua identidade.",
    icon: Palette,
  },
  {
    title: "Fotos reais",
    description: "Seu espaço, serviço, equipe ou resultado entram na página.",
    icon: ImageIcon,
  },
  {
    title: "Estrutura adequada",
    description: "A organização muda conforme o que o negócio precisa mostrar.",
    icon: LayoutTemplate,
  },
];

const palettes: PaletteOption[] = [
  {
    id: "blue",
    name: "Azul",
    color: "#145cff",
    soft: "#edf3ff",
    contrast: "#ffffff",
  },
  {
    id: "rose",
    name: "Rosa",
    color: "#b4235a",
    soft: "#fff0f5",
    contrast: "#ffffff",
  },
  {
    id: "green",
    name: "Verde",
    color: "#0f7a52",
    soft: "#eafaf3",
    contrast: "#ffffff",
  },
  {
    id: "dark",
    name: "Preto",
    color: "#171a21",
    soft: "#eff1f4",
    contrast: "#ffffff",
  },
];

const services = [
  {
    title: "Serviço principal",
    description: "O que você mais quer vender.",
  },
  {
    title: "Seu diferencial",
    description: "O motivo para escolher você.",
  },
  {
    title: "Área atendida",
    description: "Onde o cliente pode contratar.",
  },
];

const MAX_LOGO_SIZE = 2 * 1024 * 1024;
const MAX_PHOTO_SIZE = 6 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function PersonalizationSection() {
  const [selectedPaletteId, setSelectedPaletteId] = useState("blue");
  const [heroLayout, setHeroLayout] = useState<HeroLayout>("split");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [feedback, setFeedback] = useState(
    "Comece escolhendo uma cor ou enviando uma imagem.",
  );

  const logoInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const logoObjectUrlRef = useRef<string | null>(null);
  const photoObjectUrlRef = useRef<string | null>(null);

  const selectedPalette =
    palettes.find((palette) => palette.id === selectedPaletteId) ?? palettes[0];

  const previewStyle = {
    "--preview-accent": selectedPalette.color,
    "--preview-accent-soft": selectedPalette.soft,
    "--preview-accent-contrast": selectedPalette.contrast,
  } as CSSProperties;

  useEffect(() => {
    return () => {
      if (logoObjectUrlRef.current) {
        URL.revokeObjectURL(logoObjectUrlRef.current);
      }

      if (photoObjectUrlRef.current) {
        URL.revokeObjectURL(photoObjectUrlRef.current);
      }
    };
  }, []);

  function selectPalette(palette: PaletteOption) {
    setSelectedPaletteId(palette.id);
    setFeedback(`A cor ${palette.name.toLowerCase()} foi aplicada à prévia.`);
  }

  function handleImageSelection(
    event: ChangeEvent<HTMLInputElement>,
    kind: "logo" | "photo",
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const isLogo = kind === "logo";
    const maxSize = isLogo ? MAX_LOGO_SIZE : MAX_PHOTO_SIZE;
    const label = isLogo ? "O logotipo" : "A foto";

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setFeedback(`${label} precisa estar em PNG, JPG ou WebP.`);
      event.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      setFeedback(
        `${label} deve ter no máximo ${isLogo ? "2 MB" : "6 MB"}.`,
      );
      event.target.value = "";
      return;
    }

    const nextUrl = URL.createObjectURL(file);

    if (isLogo) {
      if (logoObjectUrlRef.current) {
        URL.revokeObjectURL(logoObjectUrlRef.current);
      }

      logoObjectUrlRef.current = nextUrl;
      setLogoUrl(nextUrl);
      setFeedback("Seu logotipo foi aplicado somente nesta demonstração.");
    } else {
      if (photoObjectUrlRef.current) {
        URL.revokeObjectURL(photoObjectUrlRef.current);
      }

      photoObjectUrlRef.current = nextUrl;
      setPhotoUrl(nextUrl);
      setFeedback("Sua foto foi aplicada somente nesta demonstração.");
    }

    event.target.value = "";
  }

  function removeImage(kind: "logo" | "photo") {
    if (kind === "logo") {
      if (logoObjectUrlRef.current) {
        URL.revokeObjectURL(logoObjectUrlRef.current);
      }

      logoObjectUrlRef.current = null;
      setLogoUrl(null);
      setFeedback("O logotipo foi removido da demonstração.");
      return;
    }

    if (photoObjectUrlRef.current) {
      URL.revokeObjectURL(photoObjectUrlRef.current);
    }

    photoObjectUrlRef.current = null;
    setPhotoUrl(null);
    setFeedback("A foto foi removida da demonstração.");
  }

  function resetDemo() {
    if (logoObjectUrlRef.current) {
      URL.revokeObjectURL(logoObjectUrlRef.current);
    }

    if (photoObjectUrlRef.current) {
      URL.revokeObjectURL(photoObjectUrlRef.current);
    }

    logoObjectUrlRef.current = null;
    photoObjectUrlRef.current = null;

    setLogoUrl(null);
    setPhotoUrl(null);
    setSelectedPaletteId("blue");
    setHeroLayout("split");
    setFeedback("A demonstração voltou ao estado inicial.");
  }

  return (
    <section className="personalization-section" id="personalizacao">
      <Container>
        <div className="personalization-intro">
          <div className="personalization-copy">
            <span className="personalization-kicker">
              <MousePointer2 aria-hidden="true" />
              Demonstração interativa
            </span>

            <h2>Não colocamos seu nome em um modelo pronto.</h2>

            <p>
              Teste abaixo como uma página pode mudar com{" "}
              <WordHighlight>suas cores</WordHighlight>, suas fotos e uma
              estrutura pensada para o seu negócio.
            </p>
          </div>

          <div className="personalization-highlights">
            {personalizationHighlights.map(
              ({ title, description, icon: Icon }) => (
                <article key={title}>
                  <Icon aria-hidden="true" />
                  <div>
                    <strong>{title}</strong>
                    <small>{description}</small>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>

        <div className="personalization-workbench">
          <aside className="personalization-control-panel">
            <div className="personalization-control-panel__heading">
              <div className="personalization-live-label">
                <i aria-hidden="true" />
                Personalize a demonstração
              </div>

              <h3>Faça três testes rápidos.</h3>

              <p>
                Escolha uma cor, envie sua identidade e altere o formato. A
                prévia ao lado muda na hora.
              </p>
            </div>

            <div className="personalization-controls">
              <section className="personalization-control-group">
                <div className="personalization-control-title">
                  <span>01</span>
                  <Palette aria-hidden="true" />

                  <div>
                    <strong>Escolha uma cor</strong>
                    <small>Veja a identidade aplicada à página.</small>
                  </div>
                </div>

                <div
                  className="personalization-palette"
                  aria-label="Escolha a cor da marca"
                >
                  {palettes.map((palette) => {
                    const isActive = palette.id === selectedPaletteId;

                    return (
                      <button
                        type="button"
                        key={palette.id}
                        className={isActive ? "is-active" : ""}
                        aria-pressed={isActive}
                        aria-label={`Aplicar paleta ${palette.name}`}
                        onClick={() => selectPalette(palette)}
                        style={
                          {
                            "--swatch-color": palette.color,
                            "--swatch-soft": palette.soft,
                          } as CSSProperties
                        }
                      >
                        <i />
                        <span>{palette.name}</span>
                        {isActive ? <Check aria-hidden="true" /> : null}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="personalization-control-group">
                <div className="personalization-control-title">
                  <span>02</span>
                  <Upload aria-hidden="true" />

                  <div>
                    <strong>Use sua identidade</strong>
                    <small>Os arquivos ficam somente no seu navegador.</small>
                  </div>
                </div>

                <div className="personalization-upload-actions">
                  <input
                    ref={logoInputRef}
                    className="personalization-file-input"
                    type="file"
                    tabIndex={-1}
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(event) =>
                      handleImageSelection(event, "logo")
                    }
                  />

                  <input
                    ref={photoInputRef}
                    className="personalization-file-input"
                    type="file"
                    tabIndex={-1}
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(event) =>
                      handleImageSelection(event, "photo")
                    }
                  />

                  <button
                    type="button"
                    className={logoUrl ? "has-file" : ""}
                    onClick={() => logoInputRef.current?.click()}
                  >
                    <ImagePlus aria-hidden="true" />

                    <span>
                      <strong>
                        {logoUrl ? "Trocar logotipo" : "Enviar logotipo"}
                      </strong>
                      <small>PNG, JPG ou WebP</small>
                    </span>

                    {logoUrl ? <Check aria-hidden="true" /> : null}
                  </button>

                  <button
                    type="button"
                    className={photoUrl ? "has-file" : ""}
                    onClick={() => photoInputRef.current?.click()}
                  >
                    <ImageIcon aria-hidden="true" />

                    <span>
                      <strong>{photoUrl ? "Trocar foto" : "Enviar uma foto"}</strong>
                      <small>Serviço, espaço ou equipe</small>
                    </span>

                    {photoUrl ? <Check aria-hidden="true" /> : null}
                  </button>
                </div>
              </section>

              <section className="personalization-control-group">
                <div className="personalization-control-title">
                  <span>03</span>
                  <LayoutTemplate aria-hidden="true" />

                  <div>
                    <strong>Altere o formato</strong>
                    <small>Compare duas maneiras de apresentar a abertura.</small>
                  </div>
                </div>

                <div className="personalization-layout-toggle">
                  <button
                    type="button"
                    className={heroLayout === "split" ? "is-active" : ""}
                    aria-pressed={heroLayout === "split"}
                    onClick={() => {
                      setHeroLayout("split");
                      setFeedback("Formato dividido aplicado à prévia.");
                    }}
                  >
                    <span>
                      <i />
                      <i />
                    </span>
                    Dividida
                  </button>

                  <button
                    type="button"
                    className={heroLayout === "banner" ? "is-active" : ""}
                    aria-pressed={heroLayout === "banner"}
                    onClick={() => {
                      setHeroLayout("banner");
                      setFeedback("Formato de banner aplicado à prévia.");
                    }}
                  >
                    <span>
                      <i />
                    </span>
                    Banner
                  </button>
                </div>
              </section>
            </div>

            <div className="personalization-feedback" aria-live="polite">
              <ShieldCheck aria-hidden="true" />

              <div>
                <strong>{feedback}</strong>
                <small>Nada é enviado ou armazenado.</small>
              </div>
            </div>
          </aside>

          <div className="personalization-preview-area">
            <div className="personalization-preview-heading">
              <div>
                <span>
                  <i aria-hidden="true" />
                  Prévia ao vivo
                </span>

                <strong>Veja cada alteração aplicada na hora.</strong>
              </div>

              <button
                type="button"
                className="personalization-reset"
                onClick={resetDemo}
              >
                <RotateCcw aria-hidden="true" />
                Restaurar demonstração
              </button>
            </div>

            <div
              className={`personal-preview personal-preview--${heroLayout}`}
              style={previewStyle}
            >
              <div className="personal-preview__glow" />

              <div className="personal-preview__browser">
                <div className="personal-preview__bar">
                  <div>
                    <i />
                    <i />
                    <i />
                  </div>

                  <span>seunegocio.com.br</span>

                  <small>Prévia</small>
                </div>

                <div className="personal-preview__page">
                  <header className="personal-demo-header">
                    <div className="personal-demo-brand">
                      {logoUrl ? (
                        <Image
                          src={logoUrl}
                          alt="Logotipo enviado para a prévia"
                          width={118}
                          height={34}
                          unoptimized
                        />
                      ) : (
                        <button
                          type="button"
                          className="personal-demo-brand__empty"
                          onClick={() => logoInputRef.current?.click()}
                        >
                          <ImagePlus aria-hidden="true" />
                          Enviar sua marca
                        </button>
                      )}
                    </div>

                    <nav aria-label="Navegação da demonstração">
                      <span>Início</span>
                      <span>Serviços</span>
                      <span>Contato</span>
                    </nav>

                    <span className="personal-demo-header__cta">
                      Falar comigo
                    </span>
                  </header>

                  <section className="personal-demo-hero">
                    {heroLayout === "banner" && photoUrl ? (
                      <Image
                        className="personal-demo-hero__background"
                        src={photoUrl}
                        alt=""
                        fill
                        sizes="(max-width: 1100px) 100vw, 720px"
                        unoptimized
                      />
                    ) : null}

                    <div className="personal-demo-hero__overlay" />

                    <div className="personal-demo-hero__copy">
                      <small>Atendimento na sua região</small>

                      <div className="personal-demo-hero__title">
                        Seu serviço explicado com clareza.
                      </div>

                      <p>
                        Uma apresentação profissional para ajudar o cliente a
                        entender, confiar e entrar em contato.
                      </p>

                      <span className="personal-demo-hero__cta">
                        <MessageCircle aria-hidden="true" />
                        Falar pelo WhatsApp
                      </span>
                    </div>

                    {heroLayout === "split" ? (
                      <div
                        className={`personal-demo-photo ${
                          photoUrl ? "has-photo" : ""
                        }`}
                      >
                        {photoUrl ? (
                          <>
                            <Image
                              src={photoUrl}
                              alt="Foto enviada para a prévia"
                              fill
                              sizes="(max-width: 1100px) 45vw, 360px"
                              unoptimized
                            />

                            <button
                              type="button"
                              onClick={() => removeImage("photo")}
                              aria-label="Remover foto da demonstração"
                            >
                              <X aria-hidden="true" />
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            className="personal-demo-photo__empty"
                            onClick={() => photoInputRef.current?.click()}
                          >
                            <ImagePlus aria-hidden="true" />
                            <strong>Clique para testar sua foto</strong>
                            <small>Serviço, espaço, equipe ou resultado.</small>
                          </button>
                        )}
                      </div>
                    ) : null}
                  </section>

                  <section className="personal-demo-services">
                    <div className="personal-demo-services__heading">
                      <small>Informações importantes</small>
                      <strong>O cliente encontra o que precisa.</strong>
                    </div>

                    <div className="personal-demo-services__grid">
                      {services.map((service, index) => (
                        <article key={service.title}>
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <Check aria-hidden="true" />
                          <strong>{service.title}</strong>
                          <p>{service.description}</p>
                        </article>
                      ))}
                    </div>
                  </section>

                  {logoUrl ? (
                    <button
                      type="button"
                      className="personal-demo-remove-logo"
                      onClick={() => removeImage("logo")}
                    >
                      <X aria-hidden="true" />
                      Remover logotipo
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="personalization-interaction-hint">
              <MousePointer2 aria-hidden="true" />

              <span>
                Use os controles ao lado ou clique nos espaços de imagem da
                própria prévia.
              </span>
            </div>
          </div>
        </div>

        <div className="personalization-footer">
          <div>
            <ListChecks aria-hidden="true" />

            <p>
              A demonstração mostra apenas algumas possibilidades. A estrutura
              final é definida a partir do seu negócio, dos seus serviços e do
              que o cliente precisa entender.
            </p>
          </div>

          <RollingButton
            href={createWhatsAppUrl(whatsappMessages.personalize)}
            target="_blank"
            rel="noreferrer"
          >
            Quero uma página
          </RollingButton>
        </div>
      </Container>
    </section>
  );
}
