// REDOOR 일정 데이터
// ticketLinks: 클릭 가능한 예매처 링크 목록
// ticket: 링크를 확인하지 못한 예매처를 텍스트로 표시
// ticketOpen: 티켓 오픈 일시를 텍스트로 표시
// yearly: true인 일정은 매년 자동 반복
// ANNIVERSARY + startYear는 "데뷔 0주년, 1주년..."으로 자동 계산

const REDOOR_EVENTS = [
  {
    date: "2021-01-09",
    type: "ANNIVERSARY",
    title: "리도어 데뷔",
    yearly: true,
    startYear: 2021,
    time: "",
    location: ""
  },
  {
    date: "2026-01-01",
    type: "BIRTHDAY",
    title: "이등대 생일",
    time: "",
    location: "",
    yearly: true
  },
  {
    date: "2026-04-17",
    type: "BIRTHDAY",
    title: "박세웅 생일",
    time: "",
    location: "",
    yearly: true
  },
  {
    date: "2026-05-12",
    type: "BIRTHDAY",
    title: "최승현 생일",
    time: "",
    location: "",
    yearly: true
  },
  {
    date: "2026-07-17",
    type: "FESTIVAL",
    title: "Road to BU-ROCK Fukuoka",
    time: "18:30",
    location: "후쿠오카 DRUM LOGOS",
    ticketLinks: [
      {
        name: "MAHOCAST",
        url: "https://www.mahocast.com/at/live/1841/12603"
      }
    ]
  },
  {
    date: "2026-07-19",
    type: "FESTIVAL",
    title: "SOUNDBERRY FESTA' 26",
    time: "17:50 ~ 18:40",
    location: "KINTEX 제2전시장 Hall 9",
    ticketLinks: [
      {
        name: "NOL 티켓",
        url: "https://tickets.interpark.com/goods/26006193"
      },
      {
        name: "티켓링크",
        url: "https://www.ticketlink.co.kr/product/62890"
      },
      {
        name: "YES24",
        url: "https://ticket.yes24.com/Perf/58384"
      },
      {
        name: "29CM",
        url: "https://www.29cm.co.kr/products/3973838"
      },
      {
        name: "무신사",
        url: "https://www.musinsa.com/products/6431648"
      },
      {
        name: "STAYG",
        url: "https://www.stayg.tv/channel/onsite/detail/10763"
      }
    ]
  },
  {
    date: "2026-07-26",
    type: "LIVE",
    title: "Billboard Live TAIPEI (1st Show)",
    time: "16:00",
    kstTime: "17:00",
    location: "Billboard Live TAIPEI",
    ticketLinks: [
      {
        name: "Billboard Live",
        url: "https://www.billboardlivetaipei.tw/tw/events/redoor2026"
      }
    ]
  },
  {
    date: "2026-07-26",
    type: "LIVE",
    title: "Billboard Live TAIPEI (2nd Show)",
    time: "19:00",
    kstTime: "20:00",
    location: "Billboard Live TAIPEI",
    ticketLinks: [
      {
        name: "Billboard Live",
        url: "https://www.billboardlivetaipei.tw/tw/events/redoor2026"
      }
    ]
  },
  {
    date: "2026-07-31",
    type: "RELEASE",
    title: "[SINGLE] Feathers Release",
    time: "18:00",
    location: ""
  },
  {
    date: "2026-08-02",
    type: "FESTIVAL",
    title: "2026 Incheon Pentaport Rock Festival",
    time: "15:50 ~ 16:30",
    location: "송도달빛축제공원",
    ticketLinks: [
      {
        name: "NOL 티켓",
        url: "https://tickets.interpark.com/goods/26006159"
      },
      {
        name: "YES24",
        url: "https://ticket.yes24.com/Perf/58497"
      },
      {
        name: "엔티켓(인천 할인)",
        url: "https://ticket2.enticket.com:469/rsvc/rsv_pm_detail.html?pfmIng=1&p_idx=4242"
      },
      {
        name: "NOL WORLD",
        url: "https://world.nol.com/en/ticket/places/26000456/products/26006159"
      },
      {
        name: "eplus",
        url: "https://eplus.jp/sf/detail/4552510001"
      }
    ],
    ticket: "KB Pay, MODERN SKY, Trip.com"
  },
  {
    date: "2026-08-15",
    type: "FESTIVAL",
    title: "2026 Jeonju Ultimate Music Festival",
    time: "19:00 - 19:50",
    location: "전주대학교 인조잔디구장",
    ticketLinks: [
      {
        name: "YES24",
        url: "https://ticket.yes24.com/Perf/58283"
      }
    ]
  },
  {
    date: "2026-08-26",
    type: "BIRTHDAY",
    title: "주상욱 생일",
    time: "",
    location: "",
    yearly: true
  },
   {
    date: "2026-09-04",
    type: "FESTIVAL",
    title: "MU:CON 2026 SHOWCASE",
    time: "20:00~21:00",
    location: "용산어린이정원",
    ticketLinks: [
      {
        name: "YES24",
        url: "https://ticket.yes24.com/Perf/59776"
      }
    ]
  },
  {
    date: "2026-09-06",
    type: "FESTIVAL",
    title: "MADLY MEDLEY 2026",
    time: "13:30~14:10",
    location: "문화비축기지",
    ticketLinks: [
      {
        name: "NOL 티켓",
        url: "https://tickets.interpark.com/goods/26009656"
      },
      {
        name: "멜론티켓",
        url: "https://ticket.melon.com/performance/index.htm?prodId=213522"
      },
      {
        name: "카카오톡 선물하기",
        url: "https://gift.kakao.com/brand/20014"
      }
    ],
    ticket: "Trip Events"
  },
  {
    date: "2026-09-11",
    type: "FESTIVAL",
    title: "2026 KAIST ART AND MUSIC FESTIVAL",
    time: "추후 공개",
    location: "KAIST 캠퍼스"
  },
  {
    date: "2026-09-18",
    type: "FESTIVAL",
    title: "2026 비룡제",
    time: "추후 공개",
    location: "인하대학교 대운동장"
  },
  {
    date: "2026-09-26",
    type: "LIVE",
    title: "2026 Redoor 단독콘서트 <Memory>",
    time: "18:00",
    location: "올림픽공원 올림픽홀",
    ticketOpen: "2026. 08. 28. (금) 20:00",
    ticket: "NOL 티켓"
  },
  {
    date: "2026-09-16",
    type: "RELEASE",
    title: "[4TH EP] Memory Release",
    time: "18:00",
    location: ""
 },
  {
    date: "2026-09-27",
    type: "LIVE",
    title: "2026 Redoor 단독콘서트 <Memory>",
    time: "17:00",
    location: "올림픽공원 올림픽홀",
    ticketOpen: "2026. 08. 28. (금) 20:00",
    ticket: "NOL 티켓"
  },
  {
    date: "2026-10-02",
    type: "FESTIVAL",
    title: "2026 부산국제록페스티벌",
    time: "추후 공개",
    location: "삼락생태공원",
    ticketLinks: [
      {
        name: "YES24",
        url: "https://m.ticket.yes24.com/Perf/58933"
      }
    ]
  },
  {
    date: "2026-10-17",
    type: "FESTIVAL",
    title: "GRAND MINT FESTIVAL 2026",
    time: "추후 공개",
    location: "올림픽공원",
    ticketLinks: [
      {
        name: "NOL 티켓",
        url: "https://tickets.interpark.com/goods/26010721"
      },
      {
        name: "YES24",
        url: "https://ticket.yes24.com/Perf/59339"
      },
      {
        name: "NAVER",
        url: "https://booking.naver.com/booking/12/bizes/1702892"
      }
    ]
  },
    {
    date: "2026-10-31",
    type: "FESTIVAL",
    title: "EverBlue Festival 2026 in Daegu",
    time: "추후 공개",
    location: "대구 엑스코 5층 컨벤션홀",
    ticketOpen: "2026. 08. 24. (월) 16:00",
    ticket: "NOL 티켓"
  }
];
