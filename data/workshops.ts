import { UnifiedEvent } from '../types';

export const WORKSHOPS: UnifiedEvent[] = [
  {
    number: 1,
    title: "日本分類学会第31回大会",
    badge: "研究集会",
    date: "2013年3月5日",
    place: "中央大学 後楽園キャンパス 6号館 11階 61125号室",
    link: "https://bunrui.jp/31meeting/"
  },
  {
    number: 2,
    title: "Harmonic Analysis and PDEs on Manifolds",
    badge: "研究集会",
    date: "2013年4月19日 - 20日",
    place: "中央大学 後楽園キャンパス 6号館 7階 6701号室",
    documents: [
      { title: "プログラム", url: "/pdf/program20130419.pdf" }
    ]
  },
  {
    number: 3,
    title: "斎藤 俊輔 氏（理化学研究所AIPセンター）幾何連続講演",
    badge: "連続講演",
    date: "2020年1月14日 - 18日",
    speaker: "斎藤 俊輔",
    affiliation: "理化学研究所AIPセンター",
    place: "中央大学 後楽園キャンパス 6号館 12階 61202号室",
    time: "13:20 - 16:50",
    abstract: "Title: Stabilities and canonical Kähler metrics on polarized toric manifolds\n\nAbstract: I will give a detailed account on recent developments concerning the existence of canonical metrics on polarized toric manifolds.",
    note: "（会場は，日によって変更有）\n斎藤 俊輔 氏による幾何・トポロジーセミナー(1/17（金）)"
  }
];

export const getAllWorkshops = (): UnifiedEvent[] => {
  return [...WORKSHOPS].sort((a, b) => b.number - a.number);
};
