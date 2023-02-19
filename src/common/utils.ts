import { CACHE_KEYS } from './constants';

export const getUserVerifyKey = (email: string) =>
  `${CACHE_KEYS.USER_VERIFICATION_CODE}${email}`;

export const generate6DigitNumber = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateSearchText = (
  generateSearchTextDto: GenerateSearchTextDto,
) => {
  let searchText = `${generateSearchTextDto.title}|${generateSearchTextDto.description}|${generateSearchTextDto.author}|`;

  if (generateSearchTextDto.university) {
    searchText += `${generateSearchTextDto.university}|`;
  }

  if (generateSearchTextDto.universityMajor) {
    searchText += `${generateSearchTextDto.universityMajor}|`;
  }

  if (generateSearchTextDto.course) {
    searchText += `${generateSearchTextDto.course}|`;
  }

  if (generateSearchTextDto.tags) {
    generateSearchTextDto.tags.map((tag) => {
      searchText += `${tag}|`;
    });
  }

  return searchText;
};

export class GenerateSearchTextDto {
  title: string;
  description: string;
  author?: string;
  tags?: string[];
  university?: string;
  universityMajor?: string;
  course?: string;
}
