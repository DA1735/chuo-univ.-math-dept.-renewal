import { UnifiedEvent } from "../types";

export const SPECIAL_LECTURES: UnifiedEvent[] = [
  {
    number: 2,
    title: "最終講義「代数多様体のチャーン類をめぐって」",
    badge: "最終講義",
    date: "2020年2月1日",
    speaker: "宮岡 洋一",
    affiliation: "中央大学",
    place: "中央大学 後楽園キャンパス 5号館 5階 5534教室",
    time: "16:00 - 17:00 (受付: 15:30より)",
    abstract: "",
    note: "宮岡洋一先生最終講義懇親会\n日時：2020年2月1日（土）18:00~20:30（受付:17:40より）\n会場：後楽園キャンパス 6号館 12階 61225教室\n会費：4000円（当日，懇親会受付にてお支払い願います．※学生割引あり）",
    link: ""
  },
  {
    number: 1,
    title: "「佐武先生の数学・佐武先生の想い出」",
    badge: "集会",
    date: "2015年5月9日",
    speaker: "",
    affiliation: "",
    place: "東京大学大学院数理科学研究科大講義室",
    time: "",
    abstract: "",
    note: "",
    link: "",
    documents: [
      { title: "集会のお知らせ", url: "/pdf/satake.pdf" }
    ]
  }
];

export const getAllSpecialLectures = (): UnifiedEvent[] => {
  return [...SPECIAL_LECTURES].sort((a, b) => b.number - a.number);
};
