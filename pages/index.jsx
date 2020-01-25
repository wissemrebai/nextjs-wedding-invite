import AddToCalendar from "react-add-to-calendar";
import QRCode from "qrcode.react";
import useSWR from "swr";

import Head from "@src/components/Head";
import resolvePath from "@src/utils/resolvePath";
import guestList from "./guest_list.json";
import appConfig from "@src/config/app";
import { t } from "@src/i18n";

const ShowInvite = ({ currentUrl, guest }) => {
  // Initiate config variables
  const { logo, ogTags, coupleInfo, venue, weddingDay, weddingDate, weddingTime, calendarInfo } = appConfig
  const { brideName, groomName, coupleNameFormat } = coupleInfo

  const coupleNameStr = coupleNameFormat === 'GROOM_FIRST'
    ? `${groomName} & ${brideName}`
    : `${brideName} & ${groomName}`
  const coupleName = coupleNameFormat === 'GROOM_FIRST'
    ? (<>{groomName} <span>&amp;</span> {brideName}</>)
    : (<>{brideName} <span>&amp;</span> {groomName}</>)

  // Venue info
  const venueBrief = `${venue.name}, ${venue.city}, ${venue.country}`
  const weddingDateBrief = `${weddingDate} (${weddingDay})`

  // Event info
  const eventTitle = `${coupleNameStr}'s Wedding`
  let eventDescription = `${weddingDateBrief} at ${venue.name}`
  if (guest.name) {
    eventDescription = `Dear ${guest.name}, you are cordially invited to our wedding on ${weddingDate} at ${venue.name}. Looking forward to seeing you!`
  }

  // Calendar payload
  const calendarEvent = {
    title: eventTitle,
    description: eventDescription,
    location: `${venue.city}, ${venue.country}`,
    startTime: calendarInfo.timeStartISO,
    endTime: calendarInfo.timeEndISO
  }

  return (
    <div>
      <style jsx global>{`
      a.react-add-to-calendar__button span {
        cursor: pointer;
        text-decoration: underline;
      }
      `}
      </style>
      <Head {...ogTags}
        title={eventTitle}
        description={eventDescription}
        guestName={guest.name}
        url={currentUrl}
        date={weddingDateBrief}
        venue={venueBrief}
        logo={resolvePath(ogTags.logo)}
        author={resolvePath('/')}
      />
      < section className="header_area">
        <div
          id="home"
          className="header_slider"
        >
          <div className="slick-list draggable">
            <div className="slick-track" style={{ opacity: 1 }}>
              <div
                className="single_slider bg_cover d-flex align-items-center"
                style={{
                  height: '100vh'
                }}
              >
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-12">
                      <div className="slider_content text-center" style={{ paddingTop: 0 }}>
                        <img style={{ maxHeight: 60, margin: 25, marginTop: 0 }} src={resolvePath(logo.headerLogo)} alt="logo" />
                        <h5
                          className="slider_sub_title"
                          data-animation="fadeInUp"
                          data-delay="0.2s"
                          style={{ animationDelay: '0.2s' }}
                        >{t('siteIntro')}</h5>
                        <h2
                          className="slider_title"
                          data-animation="fadeInUp"
                          data-delay="0.7s"
                          style={{ animationDelay: '0.7s' }}
                        >
                          {coupleName}
                        </h2>
                        <span
                          className="location"
                          data-animation="fadeInUp"
                          data-delay="1s"
                          style={{ animationDelay: '1s' }}
                        >{venue.name}, {venue.city}, {venue.country}.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="coming_soon" className="coming_soon_area pt-20 pb-70">
        <div className="coming_soon_shape_1" style={{ zIndex: 1 }}>
          <img src="/assets/images/shape-1.png" alt="shape" />
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div
                className="section_title pt-50 wow fadeIn"
                data-wow-duration="1.3s"
                data-wow-delay="0.2s"
                style={{ visibility: 'visible', animationDuration: '1.3s', animationDelay: '0.2s', animationName: 'fadeIn' }}
              >
                <h3 className="title">Event Date:</h3>
                <p>{weddingDateBrief}</p>
                <div style={{
                  paddingTop: '0.2rem',
                  paddingBottom: '0.2rem',
                }}>
                  <AddToCalendar event={calendarEvent} />
                </div>
                <img src="/assets/images/section_shape.png" alt="Shape" />
              </div>
            </div>
            <div className="col-lg-8">
              <div
                className="wow fadeIn"
                data-wow-duration="1.3s"
                data-wow-delay="0.6s"
                style={{ visibility: 'visible', animationDuration: '1.3s', animationDelay: '0.6s', animationName: 'fadeIn' }}
              >
                <div className="coming_soon_count d-flex justify-content-end pt-20">
                  <div
                    style={{ marginRight: 20, width: 360, height: 138, backgroundColor: 'transparent' }}
                    className="single_count d-flex align-items-center justify-content-center mt-30"
                  >
                    <div className="count_content" style={{ zIndex: 1, paddingTop: 20 }}>
                      <a href={venue.mapUrl}>
                        <img style={{ borderRadius: 5 }} src="/assets/images/oval-hotel-map-horizontal.png" alt="oval hotel map" />
                      </a>
                      <a href={venue.mapUrl} style={{
                        maxWidth: '75vw',
                        overflowX: 'hidden',
                        textOverflow: 'ellipsis',
                        marginTop: 10,
                      }}>
                        {venue.mapUrl}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="coming_soon_shape_2">
          <img src="/assets/images/shape-2.png" alt="shape" />
        </div>
      </section>

      <section id="contact" className="contact_area">
        <div className="container">
          <div
            className="contact_wrapper wow fadeInUpBig"
            data-wow-duration="1.3s"
            data-wow-delay="0.4s"
            style={{ paddingBottom: 30, boxShadow: 'none', visibility: 'visible', animationDuration: '1.3s', animationDelay: '0.4s', animationName: 'fadeInUp' }}
          >
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <div className="section_title text-center pb-30">
                  {guest.name && (<div style={{
                    textAlign: 'left',
                    maxWidth: 400,
                    margin: 'auto',
                    paddingBottom: 10,
                  }}>
                    {t('invitationGreeting')}
                    <p style={{ fontSize: '1.5rem' }}>{guest.name},</p>
                  </div>
                  )}
                  <h3 className="title">{t('invitationIntro')}</h3>
                  {guest.name && (
                    <div style={{
                      textAlign: 'left',
                      paddingTop: 20,
                      paddingBottom: 20,
                      maxWidth: 400,
                      margin: 'auto',
                    }}>
                      <p style={{
                        fontSize: '1rem',
                        lineHeight: 'inherit',
                        color: 'dimgrey',
                      }}>
                        <i>
                          {t('invitationContent')}
                          <br />
                          <br />
                          {t('invitationOutro')}
                        </i>
                      </p>
                    </div>
                  )}

                  {guest.name && (
                    <div style={{ marginTop: 20, marginBottom: 35 }}>
                      <QRCode value={guest.guestId} />
                    </div>
                  )}

                  <p className="text">
                    <a href={venue.mapUrl}
                      style={{
                        borderBottom: '0.2rem solid',
                        marginBottom: 10,
                      }}><b>{venue.name}</b></a>
                    <br />{venue.addressLine1}
                    <br />{venue.country}.
                  </p>
                  <p className="text" style={{ marginTop: 10 }}>
                    <b>{weddingDate} · {weddingTime}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Footer section */}
      <footer id="footer" className="footer_area">
        <div className="footer_shape_1">
          <img src="/assets/images/shape-1.png" alt="shape" />
        </div>
        <div className="container">
          <div className="footer_widget pt-50 pb-10 text-center">
            <div className="footer_logo">
              {logo.footerLogo &&
                (logo.footerLogoType === "mp4" ?
                  <video height="140" autoPlay muted loop>
                    <source src={resolvePath(logo.footerLogo)} type="video/mp4" />
                  </video>
                  : <img src={resolvePath(logo.footerLogo)} />
                )}
            </div>
            <div className="footer_title">
              <h3 className="title">
                {coupleName}
              </h3>
            </div>
          </div>
        </div>
        {appConfig.showBuiltWithInfo && (<div style={{
          textAlign: 'center',
          marginBottom: 40,
        }}>
          <small>
            <a style={{ color: 'grey' }} href="https://github.com/wzulfikar/nextjs-wedding-invite">
              Built with 🎔 using NextJS
            </a>
          </small>
        </div>)}
      </footer>
    </div >
  )
};

const emptyGuestParams = {
  guest: {
    guestId: '',
    name: '',
    greeting: '',
  }
}

ShowInvite.getInitialProps = (ctx) => {
  const currentUrl = resolvePath(ctx.req.url)
  const guestId = ctx.query.u
  if (!guestId) {
    return {
      currentUrl,
      ...emptyGuestParams
    }
  }

  const { name, greeting } = guestList.filter(guest => guest.guestId === guestId)[0] || {}
  if (!name) {
    return {
      currentUrl,
      ...emptyGuestParams
    }
  }

  return {
    currentUrl,
    guest: {
      name,
      greeting,
      guestId
    }
  }
}

export default ShowInvite