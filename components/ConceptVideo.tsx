import { VideoPlayer } from "@/components/VideoPlayer";

// Copy: content/copy.md → Video. Verbatim.
// Ink background. H2 in cols 1 to 5, the 16:9 frame in cols 6 to 13.
// No autoplay, no iframe embeds. Video bytes load only after the Play click.
export function ConceptVideo() {
  const src = process.env.NEXT_PUBLIC_VIDEO_URL ?? "";
  return (
    <section id="video" className="bg-ink text-paper" data-section-theme="ink">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-y-10 px-gutter py-section-y lg:grid-cols-12 lg:items-center lg:gap-x-8">
        <div className="lg:col-span-5 lg:col-start-1">
          <h2 className="text-display2 text-paper">See the Moneyball idea in 90 seconds.</h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <VideoPlayer
            src={src}
            poster="/video/poster.jpg"
            posterWidth={1920}
            posterHeight={1080}
            captions="/video/moneyball.vtt"
          />
        </div>
      </div>
    </section>
  );
}
