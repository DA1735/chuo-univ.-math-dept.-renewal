import { UnifiedEvent } from '../types';

export const EWM_EXTRA_DATA: UnifiedEvent[] = [
    {
        number: 12,
        date: "2026年3月4日-5日",
        title: "MiniWorkshop \"Hyperbolic flows, Foliations, and Topology in dimension 3\"",
        speaker: "Sergio Fenley(Florida State U.), 浅岡正幸(同志社大), 野田健夫(東邦大), 中江康晴(秋田大)",
        place: "中央大学 理工学部6号館",
        documents: [
            { title: "Program / Abstracts", url: "/pdf/3DAnosov.pdf" }
        ]
    },
    {
        number: 11,
        date: "2023年9月4日-7日",
        title: "BΓ School IV",
        speaker: "Gael Meigniez, Sam Nariman, Elmar Vogt, Takashi Tsuboi, Shigeyuki Morita, Hitoshi Moriyoshi, Yoshihiko Mitsumatsu, Teruaki Kitano",
        place: "中央大学 理工学部",
        documents: [
            { title: "Program / Abstracts", url: "/pdf/BGamma/BGamma2023/bgamma_school_2023web.pdf" }
        ]
    },
    {
        number: 10,
        date: "2018年4月5日, 14日, 21日, 27日",
        title: "Mini-Course on Novikov homology",
        speaker: "Andrei Pajitnov",
        place: "中央大学 理工学部",
    },
    {
        number: 9,
        date: "2018年3月9日-10日",
        title: "MiniWorkshop on Symplectic Foliations",
        speaker: "Mélanie Bertelson, 森 淳秀, 粕谷 直彦, 三松 佳彦",
        place: "中央大学 理工学部",
    },
    {
        number: 8,
        date: "2018年3月12日-14日",
        title: "BGamma School III",
        speaker: "Elmar Vogt, Gaël Meigniez, Sam Nariman, 森田 茂之",
        place: "中央大学 理工学部",
        documents: [
            { title: "Program", url: "/pdf/BGamma/BGamma2018/bgamma2018web.pdf" },
            { title: "Lecture Note (Vogt)", url: "/pdf/BGamma/BGamma2018/LectNote_Vogt_2018.pdf" }
        ]
    },
    {
        number: 7,
        date: "2016年3月26日",
        title: "Emmy Murphy 氏（MIT）セミナー ＠土セミ",
        speaker: "Emmy Murphy",
        time: "17:00 - 19:00",
        place: "東京工業大学 大岡山 理学部本館 201号室",
        abstract: "Rigidity and flexibility in conformal symplectic geometry",
    },
    {
        number: 6,
        date: "2015年11月13日, 16日, 18日",
        title: "Yakov Eliashberg 氏 (Stanford U.) 連続講演会",
        speaker: "Yakov Eliashberg",
        place: "東京大学 大学院数理科学研究科(駒場) 大講義室",
        abstract: "Crossroads of symplectic rigidity and flexibility\n東京大学数物フロンティア・リーディング大学院、中央大学 ENCOUNTERwithMATHEMATICS共催",
    },
    {
        number: 5,
        date: "2015年7月18日, 25日, 8月1日",
        title: "Mini-Course by David Martinez Tores (PUC-Rio)",
        speaker: "David Martinez Tores",
        place: "中央大学 理工学部",
        abstract: "Poisson geometry from a symplectic perspective",
    },
    {
        number: 4,
        date: "2013年9月21日-25日",
        title: "Seminar on Geometry, Dynamics and Foliations at Chuo University",
        speaker: "Julio Rebelo, Victor Kleptsyn, Kai Cieliebak, David Martinez Torres",
        time: "15:00 - 17:30",
        place: "Chuo University Building No.6 61225 (12th Floor, Dept. of Math.)",
        abstract: "A three-day seminar within the BGammaSchool venue featuring lectures in geometry, dynamics, and foliations.",
    },
    {
        number: 3,
        date: "2013年9月17日-19日",
        title: "BGamma School",
        speaker: "Elmar Vogt, Gaël Meigniez, Yoshi Mitsumatsu, Taro Asuke, Hélène Eynard-Bontemps, Thomas Vogel, Jonathan Bowden, Paul A. Schweitzer, Shigeyuki Morita",
        place: "中央大学 理工学部",
        documents: [
            { title: "Program (English)", url: "/pdf/BGamma/BGamma2013/bgamma2013web0916.pdf" },
            { title: "Program (日本語)", url: "/pdf/BGamma/BGamma2013/bgamma2013web0917j.pdf" }
        ]
    },
    {
        number: 2,
        date: "2016年10月",
        title: "Gaël Meigniez 教授によるミニコース",
        speaker: "Gaël Meigniez",
        place: "中央大学 理工学部",
        note: "詳細: /seminar/ENCwMATH/meigniez",
    },
    {
        number: 1,
        date: "2010年 - 2015年",
        title: "森田茂之氏による特別講義",
        speaker: "森田茂之",
        place: "中央大学 理工学部",
        abstract: "「特性類と不変量」",
        note: "詳細: /seminar/ENCwMATH/morita",
    }
];

export const getLatestEwmExtra = (): UnifiedEvent => {
    return EWM_EXTRA_DATA[EWM_EXTRA_DATA.length - 1];
};

export const getPastEwmExtras = (): UnifiedEvent[] => {
    return [...EWM_EXTRA_DATA].slice(0, EWM_EXTRA_DATA.length - 1).reverse();
};
