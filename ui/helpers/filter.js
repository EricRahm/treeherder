import { thFailureResults } from '../js/constants';

// used with field-filters to determine how to match the value against the
// job field.
export const thMatchType = {
  exactstr: 'exactstr',
  substr: 'substr', // returns true if any values match the substring
  searchStr: 'searchStr', // returns true only if ALL the values match the substring
  choice: 'choice',
};

// choices available for the field filters
export const thFieldChoices = {
  ref_data_name: { name: 'buildername/jobname', matchType: thMatchType.substr },
  build_system_type: { name: 'build system', matchType: thMatchType.substr },
  job_type_name: { name: 'job name', matchType: thMatchType.substr },
  job_type_symbol: { name: 'job symbol', matchType: thMatchType.exactstr },
  job_group_name: { name: 'group name', matchType: thMatchType.substr },
  job_group_symbol: { name: 'group symbol', matchType: thMatchType.exactstr },
  machine_name: { name: 'machine name', matchType: thMatchType.substr },
  platform: { name: 'platform', matchType: thMatchType.substr },
  tier: { name: 'tier', matchType: thMatchType.exactstr },
  failure_classification_id: { name: 'failure classification', matchType: thMatchType.choice },
  // text search across multiple fields
  searchStr: { name: 'search string', matchType: thMatchType.searchStr },
};

export const thDefaultFilterResultStatuses = [
  'testfailed',
  'busted',
  'exception',
  'success',
  'retry',
  'usercancel',
  'running',
  'pending',
  'runnable',
];

// default filter values, when a filter is not specified in the query string
export const thFilterDefaults = {
  resultStatus: thDefaultFilterResultStatuses,
  classifiedState: ['classified', 'unclassified'],
  tier: ['1', '2'],
};

// compare 2 arrays, but ignore order
export const arraysEqual = function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every(v => arr2.includes(v));
};

export const matchesDefaults = function matchesDefaults(field, values) {
  const defaults = thFilterDefaults[field];

  return defaults ? arraysEqual(values, defaults) : false;
};

export const thFilterGroups = {
  failures: thFailureResults.slice(),
  nonfailures: ['success', 'retry', 'usercancel', 'superseded'],
  'in progress': ['pending', 'running'],
};

// searchStr is internally treated as a field filter, but we don't want it
// exposed as such externally.
export const getFieldChoices = function getFieldChoices() {
  const choices = { ...thFieldChoices };

  delete choices.searchStr;
  return choices;
};

// DEPRECATED: Used to convert from old filter format to new.
export const deprecated_thFilterPrefix = 'filter-';
