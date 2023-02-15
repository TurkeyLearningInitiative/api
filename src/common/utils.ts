import { CACHE_KEYS } from './constants';
import { CreateLectureNoteDto } from '~/lecture-notes/dto/create-lecture-note.dto';

export const getUserVerifyKey = (email: string) =>
  `${CACHE_KEYS.USER_VERIFICATION_CODE}${email}`;

export const generate6DigitNumber = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateSearchText = (
  createLectureNoteDto: CreateLectureNoteDto,
) => {
  let searchText = `${createLectureNoteDto.title}|${createLectureNoteDto.description}|${createLectureNoteDto.author}|`;

  createLectureNoteDto.tags.map((tag) => {
    searchText = searchText + `${tag}|`;
  });

  return searchText;
};
