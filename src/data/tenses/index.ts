import type { TenseExercise, TenseId } from '../../types/english';
import { FUTURE_GOING_TO_EXERCISES } from './futureGoingTo';
import { FUTURE_WILL_EXERCISES } from './futureWill';
import { PAST_CONTINUOUS_EXERCISES } from './pastContinuous';
import { PAST_PERFECT_EXERCISES } from './pastPerfect';
import { PAST_SIMPLE_EXERCISES } from './pastSimple';
import { PRESENT_CONTINUOUS_EXERCISES } from './presentContinuous';
import { PRESENT_PERFECT_EXERCISES } from './presentPerfect';
import { PRESENT_PERFECT_CONTINUOUS_EXERCISES } from './presentPerfectContinuous';
import { PRESENT_SIMPLE_EXERCISES } from './presentSimple';

export const EXERCISES_BY_TENSE: Record<TenseId, TenseExercise[]> = {
  'present-simple': PRESENT_SIMPLE_EXERCISES,
  'present-continuous': PRESENT_CONTINUOUS_EXERCISES,
  'past-simple': PAST_SIMPLE_EXERCISES,
  'past-continuous': PAST_CONTINUOUS_EXERCISES,
  'future-will': FUTURE_WILL_EXERCISES,
  'future-going-to': FUTURE_GOING_TO_EXERCISES,
  'present-perfect': PRESENT_PERFECT_EXERCISES,
  'present-perfect-continuous': PRESENT_PERFECT_CONTINUOUS_EXERCISES,
  'past-perfect': PAST_PERFECT_EXERCISES,
};

export const ALL_TENSE_EXERCISES: TenseExercise[] = [
  ...PRESENT_SIMPLE_EXERCISES,
  ...PRESENT_CONTINUOUS_EXERCISES,
  ...PAST_SIMPLE_EXERCISES,
  ...PAST_CONTINUOUS_EXERCISES,
  ...FUTURE_WILL_EXERCISES,
  ...FUTURE_GOING_TO_EXERCISES,
  ...PRESENT_PERFECT_EXERCISES,
  ...PRESENT_PERFECT_CONTINUOUS_EXERCISES,
  ...PAST_PERFECT_EXERCISES,
];
