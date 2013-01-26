# Purpose

This is a general purpose date parsing library but not in the sense that you typically see in exiting Util tools.

Current tools like Ruby's Chronic seem to be solely targeted at parsing form input.

Here we look for dates as they appear in literature meant for Humans.

- "... this occurred in 300 b.c. ..."
- "... but was defeated at the Battle of Waterloo in June 1815 ..."


## Initial Goals

### Proof of concept

Simple (probably regular expression based) proof of concept that can parse the simplest of dates from semi structured text (wikipedia articles)

## Future Goals

### Determine the precision of the stated date

Was it to the century, year, day, hour precision???

### Detect date ranges

i.e. "As Napoleon I, he was Emperor of the French from 1804 to 1815."

### Determine and record the context that the date refers

i.e. "Upon graduating in September 1785, Bonaparte was"  

Context to be recorded and attached to this date: 'Graduation'
