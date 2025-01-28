type Tweets = Record<number, Tweet>;

const generateName = (): string => {
    const length = Math.floor(Math.random() * 6) + 5;
    const vowels = "aeiou";
    const consonants = "bcdfghjklmnpqrstvwxyz";
    let name = "";

    for (let i = 0; i < length; i++) {
        const charset = i % 2 === 0 ? consonants : vowels;
        name += charset[Math.floor(Math.random() * charset.length)];
    }
    return name;
};

const generateContent = (): string => {
    const length = Math.floor(Math.random() * 121) + 30;
    const words: string[] = [];
    const wordCount = Math.ceil(length / 5);

    for (let i = 0; i < wordCount; i++) {
        words.push(generateName().slice(0, Math.floor(Math.random() * 7) + 3));
    }

    return words.join(" ").slice(0, length);
};

const randomDate = (): Date => {
    const now = new Date();
    const past = new Date(now).setFullYear(now.getFullYear() - 1);
    return new Date(past + Math.random() * (now.getTime() - past));
};

interface Tweet {
    id: number;
    name: string;
    avatar: string;
    content: string;
    created_at: Date;
}

export function createTweets(): Tweet[] {
    const tweets: Tweet[] = [];

    for (let i = 1; i <= 20; i++) {
        tweets.push({
            id: i,
            name: generateName(),
            avatar: `https://i.pravatar.cc/150?u=${Math.random()
                .toString(36)
                .substring(2, 9)}`,
            content: generateContent(),
            created_at: randomDate(),
        });
    }
    return tweets;
}
