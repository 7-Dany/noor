import type { Tone } from "@/components/ui/card"

export type Lesson = {
  id: string
  title: string
  kind: "Lesson" | "Drill" | "Game"
  // Set once the lesson has a page; lessons without one render as plain rows.
  to?: string
}

export type Section = {
  id: string
  title: string
  summary: string
  lessons: readonly Lesson[]
}

export type Chapter = {
  id: string
  tone: Tone
  title: string
  summary: string
  glyph: string
  lessons: number
  sections?: readonly Section[]
}

// Noor Al-Bayan chapter structure from the founder. Titles and order are
// real; lesson counts without sections underneath are provisional until the
// content pass fills them in. Stable references, like MATERIALS.
const CHAPTERS: Record<string, readonly Chapter[]> = {
  "noor-al-bayan": [
    {
      id: "letters",
      tone: "terracotta",
      title: "Letters",
      summary: "The alphabet first: names, shapes, and sounds.",
      glyph: "ا",
      lessons: 4,
      sections: [
        {
          id: "first-steps",
          title: "First Steps",
          summary: "Know the alphabet before you read it.",
          lessons: [
            {
              id: "alphabet",
              title: "Letters",
              kind: "Lesson",
              to: "/lessons/letters",
            },
            {
              id: "shapes-positions",
              title: "Letter shapes and positions",
              kind: "Lesson",
            },
          ],
        },
        {
          id: "confusables",
          title: "Easily Mixed Letters",
          summary: "Side by side until the difference is obvious.",
          lessons: [
            {
              id: "similar-writing",
              title: "Letters with similar writing",
              kind: "Lesson",
            },
            {
              id: "similar-pronunciation",
              title: "Letters with similar pronunciation",
              kind: "Lesson",
            },
          ],
        },
      ],
    },
    {
      id: "letter-groups",
      tone: "blue",
      title: "Letter Groups",
      summary:
        "Letters that look or sound alike, learned in groups so they stick.",
      glyph: "ب",
      lessons: 2,
    },
    {
      id: "ta-marbutah",
      tone: "rose",
      title: "Ta Marbutah",
      summary: "The tied ta: its sound when joining and in pause.",
      glyph: "ة",
      lessons: 2,
    },
    {
      id: "fatha-letter-shapes",
      tone: "terracotta",
      title: "Letter Shapes Memorization with Fatha",
      summary:
        "Commit every fatha-carrying letter shape to memory, from first form to last.",
      glyph: "بَ",
      lessons: 3,
    },
    {
      id: "letters-in-words",
      tone: "ink",
      title: "Letters in Quranic Words",
      summary: "Every letter drilled inside real Quranic words.",
      glyph: "ق",
      lessons: 29,
      sections: [
        {
          id: "letters-in-words",
          title: "Letters in Quranic Words",
          summary: "One letter at a time, in real words.",
          lessons: [
            { id: "ba", title: "Ba (ب)", kind: "Drill" },
            { id: "ta", title: "Ta (ت)", kind: "Drill" },
            { id: "tha", title: "Tha (ث)", kind: "Drill" },
            { id: "jeem", title: "Jeem (ج)", kind: "Drill" },
            { id: "ha", title: "Ha (ح)", kind: "Drill" },
            { id: "kha", title: "Kha (خ)", kind: "Drill" },
          ],
        },
        {
          id: "letters-in-words-2",
          title: "Letters in Quranic words, Part 2",
          summary: "Continuing through the alphabet.",
          lessons: [
            { id: "dal", title: "Dal (د)", kind: "Drill" },
            { id: "dhal", title: "Dhal (ذ)", kind: "Drill" },
            { id: "ra", title: "Ra (ر)", kind: "Drill" },
            { id: "zay", title: "Zay (ز)", kind: "Drill" },
            { id: "seen", title: "Seen (س)", kind: "Drill" },
            { id: "sheen", title: "Sheen (ش)", kind: "Drill" },
          ],
        },
        {
          id: "letters-in-words-3",
          title: "Letters in Quranic words, Part 3",
          summary: "Continuing through the alphabet.",
          lessons: [
            { id: "sad", title: "Sad (ص)", kind: "Drill" },
            { id: "dad", title: "Dad (ض)", kind: "Drill" },
            { id: "taa", title: "Taa (ط)", kind: "Drill" },
            { id: "zha", title: "Zha (ظ)", kind: "Drill" },
            { id: "ayn", title: "Ayn (ع)", kind: "Drill" },
            { id: "ghayn", title: "Ghayn (غ)", kind: "Drill" },
          ],
        },
        {
          id: "letters-in-words-4",
          title: "Letters in Quranic words, Part 4",
          summary: "Continuing through the alphabet.",
          lessons: [
            { id: "fa", title: "Fa (ف)", kind: "Drill" },
            { id: "qaf", title: "Qaf (ق)", kind: "Drill" },
            { id: "kaf", title: "Kaf (ك)", kind: "Drill" },
            { id: "lam", title: "Lam (ل)", kind: "Drill" },
            { id: "meem", title: "Meem (م)", kind: "Drill" },
            { id: "noon", title: "Noon (ن)", kind: "Drill" },
          ],
        },
        {
          id: "letters-in-words-5",
          title: "Letters in Quranic words, Part 5",
          summary: "The last letters of the alphabet.",
          lessons: [
            { id: "haa", title: "Haa (ه)", kind: "Drill" },
            { id: "waw", title: "Waw (و)", kind: "Drill" },
            { id: "ya", title: "Ya (ي)", kind: "Drill" },
          ],
        },
        {
          id: "review",
          title: "Review",
          summary: "Mix everything together.",
          lessons: [
            { id: "mixed-review", title: "Mixed Review", kind: "Drill" },
            { id: "letter-hunt", title: "Letter Hunt", kind: "Game" },
          ],
        },
      ],
    },
    {
      id: "harakat",
      tone: "blue",
      title: "Harakat",
      summary: "Short vowels: fatha, kasra, dumma.",
      glyph: "مَ",
      lessons: 7,
      sections: [
        {
          id: "fatha",
          title: "Fatha",
          summary: "The short a sound.",
          lessons: [
            { id: "fatha-basics", title: "Fatha Basics", kind: "Lesson" },
            { id: "fatha-in-words", title: "Fatha in Words", kind: "Drill" },
          ],
        },
        {
          id: "kasra",
          title: "Kasra",
          summary: "The short i sound.",
          lessons: [
            { id: "kasra-basics", title: "Kasra Basics", kind: "Lesson" },
            { id: "kasra-in-words", title: "Kasra in Words", kind: "Drill" },
          ],
        },
        {
          id: "dumma",
          title: "Dumma",
          summary: "The short u sound.",
          lessons: [
            { id: "dumma-basics", title: "Dumma Basics", kind: "Lesson" },
            { id: "dumma-in-words", title: "Dumma in Words", kind: "Drill" },
            {
              id: "all-three-together",
              title: "All Three Together",
              kind: "Drill",
            },
          ],
        },
      ],
    },
    {
      id: "madd",
      tone: "rose",
      title: "Madd",
      summary: "Stretching sounds: alif, waw, yaa.",
      glyph: "و",
      lessons: 3,
    },
    {
      id: "tanween",
      tone: "ink",
      title: "Tanween",
      summary: "Double vowels: tanween fatha, kasra, dumma.",
      glyph: "مً",
      lessons: 3,
    },
    {
      id: "sukoon",
      tone: "terracotta",
      title: "Sukoon",
      summary: "Letters at rest: reading with sukoon.",
      glyph: "مْ",
      lessons: 3,
    },
    {
      id: "shaddah",
      tone: "blue",
      title: "Shaddah",
      summary: "Doubled letters with every vowel.",
      glyph: "مّ",
      lessons: 4,
    },
    {
      id: "two-hamza",
      tone: "rose",
      title: "Two Hamzas",
      summary: "Hamzat al-wasl and hamzat al-qat: sounded or dropped.",
      glyph: "ء",
      lessons: 1,
    },
    {
      id: "two-lam",
      tone: "ink",
      title: "Two Lams",
      summary:
        "Solar and lunar laam: when the laam melts into the following letter.",
      glyph: "ل",
      lessons: 1,
    },
    {
      id: "arabic-passages",
      tone: "terracotta",
      title: "Arabic Passages",
      summary: "Connected reading, passage by passage toward fluency.",
      glyph: "ع",
      lessons: 8,
    },
    {
      id: "general-topics",
      tone: "blue",
      title: "General Topics",
      summary: "Extra topics for the teacher.",
      glyph: "ن",
      lessons: 2,
    },
    {
      id: "games",
      tone: "rose",
      title: "Games",
      summary: "Playful drills for the class.",
      glyph: "؟",
      lessons: 3,
    },
  ],
}

const NONE: readonly Chapter[] = []

// Materials without chapters yet return an empty list.
export function getChapters(materialId: string) {
  return CHAPTERS[materialId] ?? NONE
}
