import type { TenseExercise, TenseId } from '../../types/english';
import { FUTURE_GOING_TO_EXERCISES } from './futureGoingTo';
import { FUTURE_GOING_TO_EXTRA } from './futureGoingToExtra';
import { FUTURE_WILL_EXERCISES } from './futureWill';
import { FUTURE_WILL_EXTRA } from './futureWillExtra';
import { PAST_CONTINUOUS_EXERCISES } from './pastContinuous';
import { PAST_CONTINUOUS_EXTRA } from './pastContinuousExtra';
import { PAST_PERFECT_EXERCISES } from './pastPerfect';
import { PAST_PERFECT_EXTRA } from './pastPerfectExtra';
import { PAST_SIMPLE_EXERCISES } from './pastSimple';
import { PAST_SIMPLE_EXTRA } from './pastSimpleExtra';
import { PRESENT_CONTINUOUS_EXERCISES } from './presentContinuous';
import { PRESENT_CONTINUOUS_EXTRA } from './presentContinuousExtra';
import { PRESENT_PERFECT_EXERCISES } from './presentPerfect';
import { PRESENT_PERFECT_EXTRA } from './presentPerfectExtra';
import { PRESENT_PERFECT_CONTINUOUS_EXERCISES } from './presentPerfectContinuous';
import { PRESENT_PERFECT_CONTINUOUS_EXTRA } from './presentPerfectContinuousExtra';
import { PRESENT_SIMPLE_EXERCISES } from './presentSimple';
import { PRESENT_SIMPLE_EXTRA } from './presentSimpleExtra';

export const EXERCISES_BY_TENSE: Record<TenseId, TenseExercise[]> = {
  'present-simple': [...PRESENT_SIMPLE_EXERCISES, ...PRESENT_SIMPLE_EXTRA],
  'present-continuous': [...PRESENT_CONTINUOUS_EXERCISES, ...PRESENT_CONTINUOUS_EXTRA],
  'past-simple': [...PAST_SIMPLE_EXERCISES, ...PAST_SIMPLE_EXTRA],
  'past-continuous': [...PAST_CONTINUOUS_EXERCISES, ...PAST_CONTINUOUS_EXTRA],
  'future-will': [...FUTURE_WILL_EXERCISES, ...FUTURE_WILL_EXTRA],
  'future-going-to': [...FUTURE_GOING_TO_EXERCISES, ...FUTURE_GOING_TO_EXTRA],
  'present-perfect': [...PRESENT_PERFECT_EXERCISES, ...PRESENT_PERFECT_EXTRA],
  'present-perfect-continuous': [
    ...PRESENT_PERFECT_CONTINUOUS_EXERCISES,
    ...PRESENT_PERFECT_CONTINUOUS_EXTRA,
  ],
  'past-perfect': [...PAST_PERFECT_EXERCISES, ...PAST_PERFECT_EXTRA],
};

export const ALL_TENSE_EXERCISES: TenseExercise[] = [
  ...EXERCISES_BY_TENSE['present-simple'],
  ...EXERCISES_BY_TENSE['present-continuous'],
  ...EXERCISES_BY_TENSE['past-simple'],
  ...EXERCISES_BY_TENSE['past-continuous'],
  ...EXERCISES_BY_TENSE['future-will'],
  ...EXERCISES_BY_TENSE['future-going-to'],
  ...EXERCISES_BY_TENSE['present-perfect'],
  ...EXERCISES_BY_TENSE['present-perfect-continuous'],
  ...EXERCISES_BY_TENSE['past-perfect'],
];
