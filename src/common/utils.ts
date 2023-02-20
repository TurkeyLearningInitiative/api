import { FilterQuery } from 'mongoose';
import { LectureNotesQueryDto } from '~/lecture-notes/dto/search-lecture-note.dto';
import { LectureNoteDocument } from '~/lecture-notes/entities/lecture-note.entity';
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

export const generateSearchLectureNoteDto = (
  queryParams: LectureNotesQueryDto,
) => {
  const query: FilterQuery<LectureNoteDocument> = {};
  if (queryParams.university) {
    query.university = queryParams.university;
  }

  if (queryParams.course) {
    query.course = queryParams.course;
  }

  if (queryParams.major) {
    query.major = queryParams.major;
  }

  if (queryParams.tags) {
    query.tags = { $in: queryParams.tags };
  }
  return query;
};
