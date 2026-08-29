window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.questions = window.GATE_DATA.questions || {};
window.GATE_DATA.questions['dbms'] = {
  subject: 'Databases',
  topics: [
    {
      id: 'dbms-er',
      name: 'ER Model & Relational Model',
      theory: {
        intro: 'The Entity-Relationship model is the standard tool for conceptual database design: real-world objects become entities, their properties become attributes, and associations between objects become relationships with cardinality and participation constraints. The relational model then implements the design as tables governed by keys and integrity constraints. GATE tests this pipeline heavily: you are asked to count the minimum number of tables produced from an ER diagram, classify keys as super, candidate, primary or foreign, count superkeys, and reason about entity and referential integrity. These questions are pure logic once you internalize the reduction rules, so this topic offers some of the most reliable marks in the DBMS section. Master the mapping rules for 1:1, 1:N and M:N relationships, weak entities and ternary relationships, and the combinatorics of superkeys.',
        core: 'ENTITIES AND ATTRIBUTES. A strong entity set has its own key. A weak entity set lacks a key of its own; it has only a partial key (discriminator) and is identified through an identifying relationship with an owner entity. A weak entity always participates totally in its identifying relationship, and its primary key is the owner key plus the discriminator.\n\nRELATIONSHIPS. A relationship set associates two or more entity sets. Degree is the number of participating entity sets: binary (2), ternary (3). Cardinality ratios for binary relationships are 1:1, 1:N, N:1 and M:N. Participation is total (every entity must appear in the relationship) or partial. In min-max notation (min, max), min = 1 means total participation.\n\nMINIMUM TABLE COUNT FROM AN ER DIAGRAM. Each strong entity gets a table. For an M:N relationship a separate table is mandatory, holding the keys of both sides. For a 1:N relationship no new table is needed: push the key of the 1-side into the N-side table as a foreign key. For a 1:1 relationship merge the relationship into either side; if one side participates totally, merge into that side; if both sides are total the two entities can even be combined into a single table. A weak entity gets a table containing the owner key plus its own attributes, and the identifying relationship needs no separate table. A ternary relationship generally needs its own table.\n\nKEYS. A superkey is any attribute set that uniquely identifies tuples. A candidate key is a minimal superkey: removing any attribute destroys uniqueness. The primary key is the one candidate key chosen by the designer; the others are alternate keys. A prime attribute appears in at least one candidate key. A foreign key is an attribute set in one relation that references the primary key (or a unique key) of another relation, possibly the same relation. Counting superkeys is a subset-counting exercise: with n attributes and a single candidate key K of size k, every superset of K is a superkey, giving 2 to the power (n - k) superkeys. With several candidate keys use inclusion-exclusion over the supersets.\n\nINTEGRITY CONSTRAINTS. Entity integrity: no primary key attribute may be NULL. Referential integrity: every non-NULL foreign key value must exist as a key value in the referenced relation; a foreign key itself may be NULL unless declared NOT NULL. Domain constraints restrict attribute values. On deletion of a referenced tuple, the DBMS may reject the delete (RESTRICT / NO ACTION), delete the referencing tuples too (CASCADE), or set the foreign key to NULL (SET NULL). Key declarations (PRIMARY KEY, UNIQUE) and CHECK constraints round out the standard toolkit.\n\nRELATIONAL MODEL BASICS. A relation is a set of tuples, so duplicate tuples do not exist in the pure model and tuple order is immaterial. Every relation has at least one superkey, namely the set of all its attributes, and therefore at least one candidate key.',
        strategy: 'GATE patterns to expect. (1) Minimum tables from a small ER diagram: apply the reduction rules mechanically and remember the special merges for 1:1 and 1:N; the trap is charging a table for a 1:N relationship or forgetting the mandatory table for M:N. (2) Superkey counting: fix the candidate key inside every superkey and count free subsets of the remaining attributes; with two candidate keys use inclusion-exclusion, subtracting the sets that contain both. (3) Weak entity questions: total participation and composite key (owner key + discriminator) are the two facts examiners probe. (4) Integrity: primary keys reject NULL, foreign keys may hold NULL, and CASCADE propagates deletes.\n\nWorked mini-example: R(A1, A2, A3, A4) where {A1, A2} is the only candidate key. Superkeys are all subsets containing both A1 and A2: the other two attributes are free, so 2 squared = 4 superkeys. If instead {A1} and {A2} were each candidate keys, count subsets containing A1 (8) plus subsets containing A2 (8) minus subsets containing both (4), giving 12.\n\nTime advice: table-counting and superkey questions are 1-2 minute questions once practiced; never leave them. Read participation constraints carefully, since a single word (total versus partial) changes the minimum table count. When a question mixes a weak entity with an M:N relationship, handle each construct independently and add the counts.'
      },
      questions: [
        {
          id: 'dbms-er-q1',
          q: 'Which of the following statements correctly defines a candidate key of a relation?',
          options: [
            'Any attribute set that uniquely identifies every tuple',
            'A minimal set of attributes that uniquely identifies every tuple',
            'The attribute set chosen by the DBA to identify tuples',
            'Any single attribute with no duplicate values in the current instance'
          ],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'A candidate key must satisfy two properties: uniqueness (no two tuples agree on it) and minimality (no proper subset of it is itself unique). Option 1 describes only uniqueness, which is the definition of a superkey, not a candidate key. Option 3 describes the primary key, which is the particular candidate key selected by the designer. Option 4 is wrong on two counts: keys are properties of the schema, not of one instance, and a candidate key may be composite rather than a single attribute. Hence the correct choice is the minimal unique attribute set. Remember the hierarchy: every candidate key is a superkey, every primary key is a candidate key, but not conversely.'
        },
        {
          id: 'dbms-er-q2',
          q: 'A weak entity set in the ER model is one that:',
          options: [
            'Has no attributes of its own',
            'Participates only partially in every relationship',
            'Cannot be identified by its own attributes alone and needs an identifying owner entity',
            'Has a multivalued primary key'
          ],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'A weak entity set lacks a key formed from its own attributes. It has only a partial key (discriminator), which distinguishes weak entities belonging to the same owner but not globally. Identification therefore requires the key of the owner (strong) entity through an identifying relationship. Consequently the primary key of the corresponding table is the owner key combined with the discriminator, and the weak entity necessarily has total participation in the identifying relationship. Option 1 is false because weak entities do have attributes, including the discriminator. Option 2 is the opposite of the truth for the identifying relationship, where participation is always total. Option 4 is meaningless: weak entities have no primary key of their own at all.'
        },
        {
          id: 'dbms-er-q3',
          q: 'The entity integrity constraint in the relational model states that:',
          options: [
            'Every foreign key must reference an existing tuple',
            'No attribute of a primary key can take a NULL value',
            'Every relation must have at least two candidate keys',
            'Duplicate tuples are permitted if the primary key differs'
          ],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Entity integrity says that primary key attributes must never be NULL. The reason is that the primary key is the tuple identifier; a NULL inside it would make the tuple unidentifiable and would break uniqueness checking. Option 1 describes referential integrity, a different constraint that governs foreign keys. Option 3 is false: a relation needs at least one candidate key (the full attribute set is always a superkey, so a minimal one exists), but nothing forces two. Option 4 garbles the model: since a relation is a set, exact duplicate tuples never exist, and two tuples with different primary key values are simply different tuples, not duplicates. So the defining statement of entity integrity is the NULL prohibition on primary key attributes.'
        },
        {
          id: 'dbms-er-q4',
          q: 'Which statement about foreign keys is TRUE in standard SQL?',
          options: [
            'A foreign key value may be NULL unless the column is declared NOT NULL',
            'A foreign key must always reference the primary key of a different table',
            'A foreign key column can never contain duplicate values',
            'Deleting a referenced row always deletes the referencing rows'
          ],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Referential integrity requires that every non-NULL foreign key value match an existing key value in the referenced table, but NULL itself is allowed and simply means the reference is absent, unless the column carries a NOT NULL constraint. Option 2 fails twice: a foreign key may reference a UNIQUE key, not only the primary key, and it may reference the same table (a self-reference such as a manager column in an employee table). Option 3 confuses foreign keys with candidate keys; many rows can reference the same parent, as in many employees sharing one department. Option 4 holds only when ON DELETE CASCADE is specified; the default behavior is to reject the delete (NO ACTION or RESTRICT), and SET NULL is a third possibility.'
        },
        {
          id: 'dbms-er-q5',
          q: 'A relationship set in which three entity sets participate simultaneously is called:',
          options: [
            'A recursive relationship',
            'A ternary relationship',
            'A weak relationship',
            'A composite relationship'
          ],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The degree of a relationship set is the number of entity sets that participate in it. Degree two gives a binary relationship, and degree three gives a ternary relationship, for example a supply relationship linking Supplier, Part and Project in one relationship instance. A recursive (unary) relationship is one in which the same entity set participates more than once in different roles, such as an employee supervising another employee; its degree is still counted by participations of entity sets. There is no standard construct called a weak or composite relationship in this sense. Note for table mapping: a ternary relationship in which every side is many generally requires its own table containing the keys of all three participating entity sets.'
        },
        {
          id: 'dbms-er-q6',
          q: 'An ER diagram has strong entity sets A, B and C. Relationship R1 between A and B is many-to-many. Relationship R2 from B to C is one-to-many (one B is related to many C). What is the minimum number of tables required?',
          options: ['3', '4', '5', '2'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Apply the standard reduction rules. Each strong entity set needs its own table: A, B and C give 3 tables. R1 is many-to-many, and an M:N relationship always requires a separate table holding the primary keys of A and B, adding 1 table. R2 is one-to-many with B on the one side and C on the many side; a 1:N relationship never needs a separate table, because the key of the one side is pushed into the table of the many side, so the C table simply gains a foreign key referencing B. Total: 3 entity tables + 1 relationship table for R1 = 4 tables. The classic trap is adding a fifth table for R2 or forgetting that M:N cannot be merged into either entity table.'
        },
        {
          id: 'dbms-er-q7',
          q: 'Relation R has six attributes A1, A2, A3, A4, A5, A6 and its only candidate key is {A1}. How many superkeys does R have?',
          options: ['6', '31', '32', '64'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'A superkey is any attribute set whose closure covers all attributes. Since {A1} is the only candidate key, an attribute set is a superkey exactly when it contains A1. Count the subsets of the six attributes that contain A1: A1 is fixed as a member, and each of the remaining five attributes A2 through A6 is independently either included or excluded. That gives 2 to the power 5 = 32 superkeys. Option 64 counts all subsets of six attributes and forgets to fix A1. Option 31 wrongly excludes either the set {A1} itself or the full attribute set; both are legitimate superkeys, since a candidate key is also a superkey and the entire attribute set always is one.'
        },
        {
          id: 'dbms-er-q8',
          q: 'Relation R(A1, A2, A3, A4, A5) has exactly two candidate keys: {A1} and {A2}. How many superkeys does R have?',
          options: ['16', '24', '28', '32'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'A superkey must contain at least one candidate key, so count subsets of the five attributes containing A1 or A2, using inclusion-exclusion. Subsets containing A1: fix A1, the other four attributes are free, 2 to the power 4 = 16. Subsets containing A2: likewise 16. Subsets containing both A1 and A2: fix two attributes, three are free, 2 to the power 3 = 8. By inclusion-exclusion: 16 + 16 - 8 = 24. Option 32 double-counts the sets that contain both keys, and option 16 counts only the supersets of one key. This inclusion-exclusion pattern generalizes to three or more candidate keys and appears repeatedly in GATE, so it is worth committing to memory.'
        },
        {
          id: 'dbms-er-q9',
          q: 'Entity sets E and F are connected by a one-to-one relationship R. F participates totally in R while E participates partially. What is the minimum number of tables needed to represent this design?',
          options: ['1', '2', '3', '4'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Start with one table per strong entity: E and F give 2. For a 1:1 relationship no separate relationship table is ever needed; the relationship is absorbed into one of the entity tables by adding a foreign key. The correct side to absorb it is the totally participating side: every F entity is related to some E entity, so storing the key of E inside the F table produces no NULLs and loses no information. E remains its own table because some E entities are unrelated to any F. Hence the minimum is 2 tables. Had both sides participated totally, E and F could be merged into a single combined table, giving 1. The answer 3 corresponds to the naive one-table-per-construct mapping, which is not minimal.'
        },
        {
          id: 'dbms-er-q10',
          q: 'Entity set P currently contains 50 entities and entity set Q contains 60 entities. R is a many-to-many relationship between P and Q, and a given pair (p, q) can appear in R at most once. What is the maximum possible number of relationship instances in R?',
          options: ['110', '600', '3000', '50'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'A relationship instance of a binary relationship is an ordered pair consisting of one entity from each participating set. Since the relationship is many-to-many, no cardinality constraint limits how many partners an entity may have, so every possible pair may appear. With each pair appearing at most once, the maximum number of instances is the number of distinct pairs, which is 50 times 60 = 3000. Option 110 wrongly adds the set sizes. If the relationship had been one-to-many from P to Q, each Q entity could relate to at most one P entity, capping the count at 60; a 1:1 relationship would cap it at min(50, 60) = 50. This pairing logic is the standard way GATE tests cardinality ratios numerically.'
        },
        {
          id: 'dbms-er-q11',
          q: 'Table Orders has a foreign key cust_id referencing Customers(cust_id), declared with ON DELETE CASCADE. A customer row that has three matching orders is deleted. What happens?',
          options: [
            'The delete is rejected because orders reference the customer',
            'The customer row is deleted and cust_id in the three orders becomes NULL',
            'The customer row and all three referencing order rows are deleted',
            'Only the order rows are deleted; the customer row remains'
          ],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Referential actions specify what the DBMS does when a referenced row is deleted. With ON DELETE CASCADE, the delete of the parent (customer) succeeds and is propagated: every referencing child row in Orders is deleted as well, so the customer and its three orders all disappear. Option 1 describes the default NO ACTION or RESTRICT behavior, where the delete is refused while references exist. Option 2 describes ON DELETE SET NULL, where children survive with their foreign key nulled out (only legal if the column allows NULL). Option 4 is not a defined referential action; the triggering delete always targets the parent row. Cascades can chain: if Orders is itself referenced with CASCADE by another table, the deletion propagates further down.'
        },
        {
          id: 'dbms-er-q12',
          q: 'An ER diagram contains strong entity set S, weak entity set W identified by S through identifying relationship IR, strong entity set T, and a many-to-many relationship R between S and T. What is the minimum number of tables required?',
          options: ['3', '4', '5', '6'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Handle each construct with its rule. Strong entities S and T get one table each: 2 tables. The weak entity W gets its own table whose schema is the primary key of S plus the attributes of W (including the discriminator); the identifying relationship IR is absorbed into this table and never needs a table of its own, since W already carries the owner key. Running total: 3. The M:N relationship R between S and T cannot be merged into either side, so it needs a separate table holding the keys of S and T: total 4. The common errors are adding a fifth table for IR, or trying to merge the M:N relationship into S or T, which would force redundancy or repeated groups. Minimum = 4.'
        },
        {
          id: 'dbms-er-q13',
          q: 'A ternary relationship R connects entity sets X, Y and Z, and the cardinality is many on all three sides. Using the standard ER-to-relational mapping, the minimum number of tables is:',
          options: ['3', '4', '5', '6'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Each strong entity set X, Y, Z maps to its own table: 3 tables. A ternary relationship that is many on every side cannot be represented by foreign keys inside any single participating entity table, because one entity of any set can join many combinations of the other two; pushing keys into an entity table would require repeating that entity row. Therefore R needs its own table whose attributes are the primary keys of X, Y and Z (the combination forming its key), plus any descriptive attributes of R. Total: 3 + 1 = 4. Note the contrast with binary relationships: a binary 1:N or 1:1 relationship can be folded into an entity table, but a many-many-many ternary relationship always costs an extra table.'
        },
        {
          id: 'dbms-er-q14',
          q: 'Which of the following statements is TRUE for every relation in the relational model?',
          options: [
            'It has at least one superkey',
            'It has exactly one candidate key',
            'Its primary key contains more than one attribute',
            'It permits duplicate tuples if no key is declared'
          ],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The set of all attributes of a relation always identifies tuples uniquely, because a relation is a set of tuples and two identical tuples cannot coexist. Hence the full attribute set is a superkey of every relation, proving option 1. Since some superkey exists, a minimal one exists too, so every relation has at least one candidate key, but possibly several, which refutes the word exactly in option 2. Option 3 is false because single-attribute primary keys are common and perfectly legal. Option 4 contradicts the set semantics of the pure relational model: duplicates are excluded by definition, regardless of declared keys (SQL tables differ here, since they are multisets, but the question concerns relations).'
        },
        {
          id: 'dbms-er-q15',
          q: 'Consider these statements about the ER model. S1: A weak entity set always has total participation in its identifying relationship. S2: The discriminator of a weak entity set can by itself uniquely identify weak entities across different owners. S3: Total participation of an entity set in a relationship is shown by a double line in ER notation. Which statements are true?',
          options: ['S1 and S2 only', 'S1 and S3 only', 'S2 and S3 only', 'S1, S2 and S3'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'S1 is true: a weak entity exists only through its owner, so every weak entity must appear in the identifying relationship, which is exactly total participation. S2 is false and states the opposite of the definition: the discriminator (partial key) distinguishes weak entities only among those attached to the same owner entity; two weak entities under different owners may share a discriminator value, which is precisely why the owner key must be added to form the full key. S3 is true: standard ER notation draws total participation as a double line connecting the entity set to the relationship (and draws the weak entity set and identifying relationship with double rectangles and double diamonds). Hence S1 and S3 only.'
        }
      ]
    },
    {
      id: 'dbms-ra-sql',
      name: 'Relational Algebra & SQL',
      theory: {
        intro: 'Relational algebra is the procedural query language underlying every relational engine, and SQL is its declarative counterpart on the exam and in practice. GATE questions in this area rarely ask for definitions; instead they hand you two or three tiny tables and ask exactly how many tuples a query returns, or they probe subtle semantics: how projection eliminates duplicates while SQL does not, how NULL propagates through comparisons and aggregates, why NOT IN behaves strangely when the subquery yields NULL, and how EXISTS-based division expresses for-all conditions. Mastery here means executing queries by hand, tuple by tuple, without skipping the boring bookkeeping. This section covers the six fundamental operators, derived operators such as join and division, tuple relational calculus and safety, and the SQL constructs GATE loves: joins, nested and correlated subqueries, GROUP BY with HAVING, and aggregate functions over NULLs.',
        core: 'FUNDAMENTAL OPERATORS. Selection (sigma) picks rows satisfying a predicate; projection (pi) picks columns and, because relations are sets, removes duplicate rows; union, set difference and Cartesian product combine relations (union and difference require union-compatible schemas); rename (rho) relabels. Everything else is derived: intersection = R minus (R minus S); theta join = selection over a product; natural join = theta join on equality of all common attributes followed by projection that drops the duplicated columns; division R divide S returns those values of the non-shared attributes of R that are paired in R with every tuple of S.\n\nJOIN COUNTING. For a natural join, group tuples by the join attribute value: if a value appears m times in R and n times in S it contributes m times n tuples. A natural join between relations with no common attribute degenerates to the Cartesian product. Outer joins pad the non-matching side with NULLs: left outer join keeps every tuple of the left relation, right keeps the right, full keeps both.\n\nTUPLE RELATIONAL CALCULUS. A query has the form set of t such that P(t). It is declarative; safety demands that every answer tuple be built from values appearing in the database relations mentioned, so an expression such as all tuples not in R is unsafe because it ranges over an infinite domain. Safe calculus, relational algebra and domain calculus are equally expressive.\n\nSQL SEMANTICS THAT DIFFER FROM ALGEBRA. SQL tables are multisets: SELECT does not remove duplicates unless DISTINCT is written. WHERE filters rows before grouping; GROUP BY partitions rows; HAVING filters whole groups after aggregation; ORDER BY sorts output. Aggregates ignore NULL except COUNT(*), which counts rows: for a column A with values 1, NULL, 2, COUNT(*) = 3 but COUNT(A) = 2. In GROUP BY, all NULLs of the grouping column fall into one group.\n\nNULL AND THREE-VALUED LOGIC. Any comparison with NULL, including NULL = NULL, evaluates to UNKNOWN, and WHERE keeps only rows evaluating to TRUE. This gives the classic NOT IN trap: A NOT IN (subquery) means A <> v1 AND A <> v2 AND so on; if any vi is NULL that conjunct is UNKNOWN, so no row can qualify and the query returns zero rows. IN with a NULL in the list can still return TRUE if a real match exists. Use IS NULL, never = NULL.\n\nEXISTS AND DIVISION. EXISTS(subquery) is TRUE when the subquery returns at least one row; correlated subqueries re-evaluate per outer row. The for-all pattern (students who registered for every course) is written with double negation: select s where NOT EXISTS (a course for which NOT EXISTS a registration of s). In algebra this is exactly division. GATE also tests equivalences: a selection whose predicate uses only attributes of R can be pushed inside a join, and joins are commutative and associative, which is the basis of query optimization.',
        strategy: 'The dominant GATE pattern is output counting on tables of three to six rows. Execute mechanically: for joins, tabulate match counts per join value and multiply; for outer joins, add one padded row per unmatched tuple on the preserved side; for GROUP BY, first list the groups, then apply HAVING to each group, then produce one output row per surviving group. Traps to rehearse: (1) NOT IN with a NULL in the subquery result returns the empty set; (2) COUNT(*) versus COUNT(column) versus COUNT(DISTINCT column) differ exactly when NULLs or duplicates exist; (3) projection in algebra deduplicates but SQL SELECT does not; (4) WHERE cannot contain aggregates, HAVING can; (5) a natural join with no common attributes is a Cartesian product.\n\nWorked mini-example: R(A) = 1, 2, 3 and S(A) = 2, 2, 3. Natural join on A: value 2 contributes 1 x 2 = 2 tuples, value 3 contributes 1 x 1 = 1, total 3. Left outer join of R with S additionally preserves the unmatched row 1 padded with NULLs, giving 4 rows. Now SELECT COUNT(*) versus COUNT(S.A) on that outer join result: 4 versus 3, because the padded NULL is ignored by COUNT(S.A).\n\nBudget about two minutes per counting question and always re-check the duplicate and NULL rows: nearly every wrong option corresponds to forgetting exactly one of them.'
      },
      questions: [
        {
          id: 'dbms-ra-sql-q1',
          q: 'Which of the following relational algebra operators is NOT one of the fundamental (basic) operators, i.e. it can be expressed using the others?',
          options: ['Selection', 'Set difference', 'Natural join', 'Cartesian product'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The fundamental set of relational algebra operators is: selection, projection, union, set difference, Cartesian product and rename. These six are independent; none can be built from the others. Natural join is a derived operator: it equals a Cartesian product, followed by a selection that equates every pair of common attributes, followed by a projection that removes the duplicated columns. Similarly intersection is derived as R minus (R minus S), and division can be built from projection, product and difference. GATE regularly asks either which operators are basic or how to express a derived operator in terms of basic ones, so remember the six-element basis and the standard constructions for join, intersection and division.'
        },
        {
          id: 'dbms-ra-sql-q2',
          q: 'Relation R(A, B) contains the tuples (1, x), (2, x), (3, y). How many tuples does the relational algebra expression pi_B(R) return, and how many rows does the SQL query SELECT B FROM R return?',
          options: ['2 and 2', '2 and 3', '3 and 3', '3 and 2'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'Relational algebra works on sets, so projection automatically eliminates duplicates: projecting B from the three tuples yields the values x, x, y, and after deduplication the result is the set containing x and y, which has 2 tuples. SQL, in contrast, works on multisets: SELECT B FROM R keeps every row it produces, so the output is x, x, y with 3 rows. To reproduce the algebra behavior in SQL you must write SELECT DISTINCT B FROM R, which would return 2 rows. This algebra-versus-SQL duplicate distinction is one of the most frequently tested one-mark facts, and it also matters inside set operations: SQL UNION removes duplicates but UNION ALL keeps them.'
        },
        {
          id: 'dbms-ra-sql-q3',
          q: 'In SQL, the condition X = NULL in a WHERE clause (where X is a column):',
          options: [
            'Is true for rows where X is NULL',
            'Always evaluates to UNKNOWN, so no rows are selected by it',
            'Causes a syntax error in all SQL implementations',
            'Is equivalent to X IS NULL'
          ],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'SQL uses three-valued logic with the truth values TRUE, FALSE and UNKNOWN. Any ordinary comparison in which either operand is NULL evaluates to UNKNOWN, and this includes NULL = NULL. A WHERE clause keeps a row only when its condition evaluates to TRUE, so a predicate that is UNKNOWN for every row selects nothing. Therefore X = NULL never selects any row, even rows where X actually is NULL, which is exactly why the language provides the special predicates X IS NULL and X IS NOT NULL for null testing. The expression is syntactically legal, so option 3 is wrong, and it is emphatically not equivalent to IS NULL, so option 4 is wrong. Remember: NULL means value unknown, and unknown compared with anything stays unknown.'
        },
        {
          id: 'dbms-ra-sql-q4',
          q: 'What is the difference between the WHERE clause and the HAVING clause in SQL?',
          options: [
            'WHERE filters individual rows before grouping; HAVING filters groups after aggregation',
            'WHERE filters groups; HAVING filters individual rows',
            'They are interchangeable whenever GROUP BY is present',
            'HAVING can only appear together with ORDER BY'
          ],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The logical evaluation order of a SQL query is: FROM, then WHERE, then GROUP BY, then HAVING, then SELECT, then ORDER BY. WHERE is applied to individual rows before any grouping happens, so it may not contain aggregate functions (there are no groups yet to aggregate). GROUP BY then partitions the surviving rows, aggregates are computed per group, and HAVING filters entire groups using conditions that typically involve aggregates, such as COUNT(*) > 1 or SUM(sal) > 10000. They are not interchangeable: a row-level condition placed in HAVING would have to reference grouped columns, and an aggregate condition simply cannot go into WHERE. HAVING has no dependence on ORDER BY. This evaluation pipeline is essential for the output-counting questions later in this topic.'
        },
        {
          id: 'dbms-ra-sql-q5',
          q: 'If relations R and S have no attribute names in common, then the natural join of R and S is equal to:',
          options: [
            'The union of R and S',
            'The intersection of R and S',
            'The Cartesian product of R and S',
            'The empty relation'
          ],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Natural join pairs tuples of R and S that agree on all attributes common to the two schemas. When the set of common attributes is empty, the agreement condition is vacuously true for every pair of tuples: there is nothing on which they could disagree. Consequently every tuple of R combines with every tuple of S, which is precisely the Cartesian product, containing |R| times |S| tuples. Union and intersection are not even defined here unless the schemas are union-compatible, which relations with disjoint attribute names of different types generally are not. The empty relation is the opposite of what happens. This edge case is a favorite one-liner in GATE and also explains why unintended attribute-name mismatches silently blow up natural join results.'
        },
        {
          id: 'dbms-ra-sql-q6',
          q: 'R(A, B) contains (1, x), (2, y), (3, x). S(B, C) contains (x, p), (x, q), (y, r). How many tuples are in the natural join of R and S?',
          options: ['3', '5', '6', '9'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'The common attribute is B, so count matches per B value and multiply. Value x: appears in R twice, via tuples (1, x) and (3, x), and in S twice, via (x, p) and (x, q); contribution 2 x 2 = 4 tuples, namely (1, x, p), (1, x, q), (3, x, p), (3, x, q). Value y: appears once in R, as (2, y), and once in S, as (y, r); contribution 1 x 1 = 1 tuple, (2, y, r). Total 4 + 1 = 5. Option 9 is the full Cartesian product size 3 x 3, option 3 forgets that x matches multiply, and option 6 miscounts the x block. The multiply-per-join-value technique is the fastest reliable way to do these counts.'
        },
        {
          id: 'dbms-ra-sql-q7',
          q: 'R(A) contains the values 1, 2, 3, 4. S(A, C) contains (1, p), (1, q), (3, r). How many rows does R LEFT OUTER JOIN S ON R.A = S.A produce?',
          options: ['3', '4', '5', '6'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'A left outer join returns all matched combinations plus one NULL-padded row for every left tuple that finds no match. Row A = 1 matches two S tuples, contributing 2 rows: (1, p) and (1, q). Row A = 2 has no match in S, so it survives as (2, NULL), 1 row. Row A = 3 matches (3, r), 1 row. Row A = 4 has no match, giving (4, NULL), 1 row. Total 2 + 1 + 1 + 1 = 5 rows. The inner join alone would give 3 rows; the outer join adds exactly the 2 unmatched left rows. Note that a preserved row is padded, not multiplied: an unmatched left tuple contributes exactly one output row regardless of the size of S.'
        },
        {
          id: 'dbms-ra-sql-q8',
          q: 'Table Emp(dept, sal) contains: (D1, 100), (D1, 200), (D2, 150), (D3, 300), (D3, 100), (D3, 200). How many rows does this query return?\nSELECT dept, MAX(sal)\nFROM Emp\nGROUP BY dept\nHAVING COUNT(*) > 1;',
          options: ['1', '2', '3', '6'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Step 1, group: GROUP BY dept forms three groups: D1 with rows (100, 200), D2 with row (150), D3 with rows (300, 100, 200). Step 2, apply HAVING to each group: COUNT(*) is 2 for D1, 1 for D2, 3 for D3, so the condition COUNT(*) > 1 keeps D1 and D3 and discards D2. Step 3, project one row per surviving group with its aggregate: (D1, 200) and (D3, 300). The result has 2 rows. Option 3 forgets the HAVING filter, and option 6 forgets that grouping collapses each group to a single output row. Always resolve GROUP BY fully before touching HAVING; mixing the two steps is the standard source of errors.'
        },
        {
          id: 'dbms-ra-sql-q9',
          q: 'R(A) contains the values 1, 2, 3. S(B) contains the values 1, NULL. How many rows does this query return?\nSELECT A FROM R WHERE A NOT IN (SELECT B FROM S);',
          options: ['0', '1', '2', '3'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'A NOT IN (1, NULL) expands to A <> 1 AND A <> NULL. Any comparison with NULL is UNKNOWN, so the second conjunct is UNKNOWN for every value of A. For A = 1 the first conjunct is FALSE, making the whole condition FALSE. For A = 2 or A = 3 the condition is TRUE AND UNKNOWN = UNKNOWN. WHERE keeps only rows whose condition is TRUE, so no row qualifies and the query returns 0 rows. Intuitively, the database cannot promise that 2 differs from the unknown value, so it refuses to include it. Had the query used NOT EXISTS with the correlation R.A = S.B, the NULL would simply never match and the answer would be 2 rows. This NOT IN versus NOT EXISTS asymmetry under NULLs is a prime GATE trap.'
        },
        {
          id: 'dbms-ra-sql-q10',
          q: 'The query find the students who are enrolled in EVERY course offered is most directly expressed in relational algebra using which operator?',
          options: ['Natural join', 'Division', 'Set difference alone', 'Outer join'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Universal quantification over a set of tuples, the for-all pattern, is exactly what the division operator provides. If Enrolled(sid, cid) records enrollments and Course(cid) lists all courses, then Enrolled divided by Course yields the student ids paired in Enrolled with every course id. Natural join expresses existence of a matching tuple, not universality. Division can itself be constructed from projection, Cartesian product and set difference by computing the students for whom some course is missing and subtracting them, and that construction is the template for the SQL formulation with double NOT EXISTS: select students such that there does not exist a course for which there does not exist a matching enrollment. Whenever a GATE query says every or all on the many side, think division.'
        },
        {
          id: 'dbms-ra-sql-q11',
          q: 'Let c be a selection condition that mentions only attributes of relation R. Which equivalence is correct for the natural join of R and S?',
          options: [
            'sigma_c(R join S) = sigma_c(R) join sigma_c(S)',
            'sigma_c(R join S) = sigma_c(R) join S',
            'sigma_c(R join S) = R join sigma_c(S)',
            'The selection cannot be moved inside a join in general'
          ],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Because c tests only attributes of R, whether an output tuple of the join satisfies c depends solely on its R part. It is therefore equivalent to filter R first and then join: sigma_c(R join S) = sigma_c(R) join S. This rewrite, called selection pushdown, is a cornerstone of query optimization since it shrinks a join input early and cuts intermediate result size. Option 1 is invalid as written because c references attributes of R that S may not even possess, so sigma_c(S) is ill-formed (the variant where c splits into conditions on each relation does distribute). Option 3 pushes the filter to the wrong operand. Option 4 is too pessimistic: pushing is always legal when the condition mentions attributes of only one operand.'
        },
        {
          id: 'dbms-ra-sql-q12',
          q: 'Column A of table T contains the values 1, NULL, 2, NULL, 2 in its five rows. What do COUNT(*), COUNT(A) and COUNT(DISTINCT A) return, in that order?',
          options: ['5, 3, 2', '5, 5, 3', '3, 3, 2', '5, 3, 3'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'COUNT(*) counts rows regardless of content, and T has 5 rows, so it returns 5. COUNT(A) counts rows where A is not NULL: the non-null values are 1, 2, 2, so it returns 3; like every aggregate except COUNT(*), it silently discards NULLs. COUNT(DISTINCT A) first drops NULLs and then removes duplicates, leaving the values 1 and 2, so it returns 2. The answer is 5, 3, 2. For contrast, SUM(A) would be 5, and AVG(A) would be 5 divided by 3 (the non-null count), not 5 divided by 5, another consequence of NULL elimination. GATE often hides one of these three counts inside a larger query, so compute the NULL and duplicate bookkeeping explicitly rather than by eye.'
        },
        {
          id: 'dbms-ra-sql-q13',
          q: 'Table E(name, sal) contains: (a, 10), (b, 20), (c, 30), (d, 30). How many rows does this self-join query return?\nSELECT e1.name, e2.name\nFROM E e1, E e2\nWHERE e1.sal > e2.sal;',
          options: ['4', '5', '6', '8'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'The query forms all 16 ordered pairs of rows and keeps those where the first salary strictly exceeds the second. Enumerate by e1: e1 = a (10): exceeds nothing, 0 pairs. e1 = b (20): exceeds only 10, 1 pair (b, a). e1 = c (30): exceeds 10 and 20, 2 pairs (c, a), (c, b). e1 = d (30): likewise 2 pairs (d, a), (d, b). Crucially, 30 > 30 is false, so c and d generate no pair with each other in either direction. Total 0 + 1 + 2 + 2 = 5. Option 6 comes from wrongly counting the tie between c and d, and option 8 from counting >= instead of >. In self-join counting, ties and the strictness of the inequality decide the answer, so always tabulate row by row.'
        },
        {
          id: 'dbms-ra-sql-q14',
          q: 'Which of the following tuple relational calculus expressions is UNSAFE?',
          options: [
            'The set of t such that t is in R and t.A = 5',
            'The set of t such that t is in R and t is not in S (R, S union-compatible)',
            'The set of t such that t is not in R',
            'The set of t such that t is in R and there exists u in S with u.B = t.B'
          ],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'A calculus expression is safe when every tuple in its answer is guaranteed to be built from values that appear in the relations mentioned in the expression, so the result is always finite. The expression selecting all t not in R ranges over the entire (infinite) underlying domain: any tuple whatsoever that fails to appear in R qualifies, so the answer is infinite and domain-dependent, the definition of unsafe. Option 1 is a plain selection, safe. Option 2 looks similar to option 3 but is safe because t is first required to belong to R, so the answer is a subset of R; it computes R minus S. Option 4 is a safe existential (semi-join style) condition. Safe tuple calculus has exactly the expressive power of relational algebra; unsafe expressions fall outside it.'
        },
        {
          id: 'dbms-ra-sql-q15',
          q: 'R(A, B) contains (a1, b1), (a1, b2), (a2, b1), (a3, b1), (a3, b2). S(B) contains b1, b2. How many tuples does R divided by S contain?',
          options: ['1', '2', '3', '0'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'R divided by S returns each A value that is paired in R with every B value of S, that is, with both b1 and b2. Check each A: a1 is paired with b1 (tuple a1, b1) and with b2 (tuple a1, b2), so a1 qualifies. a2 is paired only with b1 and misses b2, so it fails. a3 is paired with b1 and b2, so it qualifies. The quotient is the set containing a1 and a3, which has 2 tuples. The mechanical procedure: group R by A, collect the set of B values for each group, and keep the groups whose B-set is a superset of S. Division is the algebra analogue of the SQL double NOT EXISTS pattern, and small quotient computations like this one are standard two-mark material.'
        },
        {
          id: 'dbms-ra-sql-q16',
          q: 'Table T(A, B) contains: (1, x), (1, NULL), (NULL, y), (NULL, NULL), (2, NULL). Consider:\nSELECT A, COUNT(B) FROM T GROUP BY A;\nHow many rows are returned, and what is COUNT(B) for the group where A is NULL?',
          options: ['3 rows; count 1', '3 rows; count 2', '4 rows; count 1', '2 rows; count 1'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Two NULL rules interact here. First, in GROUP BY all rows whose grouping value is NULL are placed together in a single group, so the groups are: A = 1 with rows (1, x) and (1, NULL); A = NULL with rows (NULL, y) and (NULL, NULL); A = 2 with row (2, NULL). That is 3 groups, hence 3 output rows. Second, COUNT(B) ignores NULL values of B within each group: for the A = NULL group the B values are y and NULL, so COUNT(B) = 1. For completeness, the A = 1 group also yields count 1, and the A = 2 group yields count 0, not NULL, since COUNT over an all-NULL set is 0. So the answer is 3 rows with count 1 for the NULL group. The traps are splitting the two NULL keys into separate groups and counting the NULL B values.'
        }
      ]
    },
    {
      id: 'dbms-normalization',
      name: 'Functional Dependencies & Normalization',
      theory: {
        intro: 'Normalization is the most algorithmic part of GATE DBMS, and therefore the most scoreable. Everything rests on functional dependencies: X determines Y means any two tuples agreeing on X must agree on Y. From a set of FDs you compute attribute closures, and from closures you find candidate keys, classify attributes as prime or nonprime, and place a relation in 1NF, 2NF, 3NF or BCNF. Decomposition questions then test whether a split of a relation is lossless and whether it preserves dependencies. Almost every question type here reduces to running the closure algorithm carefully: candidate key counting, highest normal form identification, minimal cover construction, and membership tests for derived FDs. GATE asks these every single year, usually as two-mark problems on relations of four to six attributes, so fluency with closures pays off more than any other DBMS skill.',
        core: 'FUNCTIONAL DEPENDENCIES AND ARMSTRONG AXIOMS. An FD X -> Y holds on R when equal X values force equal Y values. Armstrong axioms are sound and complete: reflexivity (Y subset of X gives X -> Y), augmentation (X -> Y gives XZ -> YZ), transitivity (X -> Y and Y -> Z give X -> Z). Derived rules: union, decomposition of the right side, pseudotransitivity. Splitting the LEFT side is not valid: AB -> C does not yield A -> C.\n\nATTRIBUTE CLOSURE. X plus is the set of attributes determined by X: start with X, repeatedly add the right side of any FD whose left side is already inside, until nothing changes. Uses: X -> Y holds iff Y is inside X plus; X is a superkey iff X plus is all attributes; X is a candidate key iff additionally no proper subset has that property.\n\nFINDING ALL CANDIDATE KEYS. Classify attributes: those appearing on no right side of any FD must be in every candidate key (call this core set C). Compute C plus; if it covers everything, C is the unique candidate key. Otherwise extend C with attributes one at a time, keeping minimal extensions that reach full closure. Attributes appearing on no left side can never help and only appear in keys if they are in C. A prime attribute belongs to at least one candidate key; the rest are nonprime.\n\nNORMAL FORMS. 1NF: atomic values only, assumed for GATE. 2NF: no nonprime attribute depends on a proper subset of any candidate key (no partial dependency). 3NF: for every nontrivial FD X -> A, either X is a superkey or A is prime. BCNF: for every nontrivial FD X -> A, X is a superkey, no exception for prime attributes. So BCNF implies 3NF implies 2NF implies 1NF. Quick test order: check BCNF first; if a violating FD has a prime right side, drop to 3NF; if a nonprime attribute hangs off part of a key, drop below 2NF.\n\nDECOMPOSITION PROPERTIES. A binary decomposition of R into R1 and R2 is lossless iff the common attributes R1 intersect R2 form a superkey of R1 or of R2 (under the projected dependencies). Dependency preservation: the union of the FDs projectable onto the components must imply the original set; check any suspicious FD by closure using only projected FDs. Facts to memorize: a lossless, dependency-preserving decomposition into 3NF always exists (synthesis algorithm); for BCNF, lossless is always achievable but dependency preservation sometimes is not.\n\nMINIMAL COVER. Transform F so that every right side is a single attribute, no left side has an extraneous attribute (test: remove the attribute, recompute closure with the remaining left part, see whether the right side is still derived), and no FD is redundant (test: delete it and check derivability from the rest). Minimal covers drive the 3NF synthesis algorithm: one relation per FD group, plus a key relation if no component contains a candidate key.',
        strategy: 'GATE patterns. (1) Compute X plus: pure mechanics, never lose these marks; write the growing set down, do not track it mentally. (2) Count candidate keys: find the core attributes (never on any right side) first; this instantly prunes the search. (3) Highest normal form: find ALL candidate keys before judging, because an attribute you believe nonprime may be prime through a second key, turning a BCNF violation into legal 3NF. (4) Lossless and dependency-preservation checks on a given decomposition: intersect the schemas and take a closure; then project FDs and test the doubtful dependency. (5) Minimal cover: follow the three steps in order (split right sides, remove extraneous left attributes, remove redundant FDs), since reordering can give a non-minimal result.\n\nTraps: splitting left sides of FDs; declaring 3NF while a nonprime attribute depends on a proper subset of a key (that is a 2NF failure); forgetting that a relation with all attributes prime is automatically in 3NF; and assuming every BCNF decomposition preserves dependencies.\n\nWorked mini-example: R(A, B, C), F = {A -> B, B -> C}. A plus = ABC so A is the only candidate key (B plus = BC, C plus = C). B -> C has a non-superkey left side and nonprime right side, so R is in 2NF but not 3NF. Decompose into R1(A, B) and R2(B, C): intersection B is a key of R2, so lossless; both FDs survive, so dependency preserving. This five-line drill is the template for most two-mark questions.'
      },
      questions: [
        {
          id: 'dbms-normalization-q1',
          q: 'A relation R is in BCNF if and only if for every nontrivial functional dependency X -> Y that holds on R:',
          options: [
            'Y is a prime attribute',
            'X is a superkey of R',
            'X is a proper subset of some candidate key',
            'Y is a candidate key of R'
          ],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'BCNF is the strictest of the classical normal forms based on functional dependencies: every nontrivial FD must have a superkey as its left side, with no exemptions. Compare with 3NF, which permits a violation when the right side is a prime attribute; option 1 describes that extra allowance of 3NF, not the BCNF condition. Option 3 describes the shape of a partial dependency, which is what 2NF forbids for nonprime attributes. Option 4 is not any normal form condition. Since the BCNF condition is strictly stronger, every BCNF relation is automatically in 3NF, 2NF and 1NF. When testing a relation, scan each given FD, take the closure of its left side, and ask whether it covers all attributes; one failure with a nonprime right side settles the classification.'
        },
        {
          id: 'dbms-normalization-q2',
          q: 'Which of the following is the complete set of Armstrong axioms (the sound and complete inference rules for functional dependencies)?',
          options: [
            'Reflexivity, augmentation, transitivity',
            'Reflexivity, union, decomposition',
            'Augmentation, transitivity, pseudotransitivity',
            'Union, decomposition, transitivity'
          ],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The three Armstrong axioms are: reflexivity (if Y is a subset of X then X -> Y, giving the trivial dependencies), augmentation (if X -> Y then XZ -> YZ for any Z), and transitivity (if X -> Y and Y -> Z then X -> Z). This set is sound, meaning every derived FD genuinely holds, and complete, meaning every FD logically implied by F can be derived. Union (X -> Y and X -> Z give X -> YZ), decomposition (X -> YZ gives X -> Y), and pseudotransitivity (X -> Y and WY -> Z give WX -> Z) are convenient secondary rules, but each is provable from the three axioms, so listing them as axioms is wrong. Remember also the classic non-rule: from AB -> C you may NOT infer A -> C; left sides never split.'
        },
        {
          id: 'dbms-normalization-q3',
          q: 'The Second Normal Form (2NF) specifically eliminates which kind of dependency?',
          options: [
            'Transitive dependency of nonprime attributes on candidate keys',
            'Partial dependency of nonprime attributes on a proper subset of a candidate key',
            'Multivalued dependency between prime attributes',
            'Dependency of prime attributes on nonprime attributes'
          ],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'A relation is in 2NF when it is in 1NF and no nonprime attribute is functionally dependent on a proper subset of any candidate key. Such a dependency is called a partial dependency: part of a composite key already determines a nonprime attribute, causing that attribute to repeat once per key fragment and produce update anomalies. Note that a relation whose candidate keys are all single attributes is trivially in 2NF, since a single-attribute key has no nonempty proper subset that could carry a partial dependency. Option 1 describes what 3NF removes on top of 2NF, namely nonprime attributes reached transitively through a non-key attribute set. Multivalued dependencies belong to 4NF, and option 4 is not the defining condition of any of the classical forms.'
        },
        {
          id: 'dbms-normalization-q4',
          q: 'R(A, B, C) has the functional dependencies A -> B and B -> C. What is the candidate key of R?',
          options: ['A', 'B', 'C', 'AB'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'Compute closures. A plus: start with A; A -> B adds B; B -> C adds C; so A plus = ABC, covering all attributes, and A is a superkey. Since A is a single attribute it is automatically minimal, hence a candidate key. Check the alternatives: B plus = BC, missing A, so B is not a key; C plus = C, so C is not a key. AB is a superkey but not minimal, because its proper subset A already determines everything, so AB is not a candidate key. Also note that A appears on no right side of any FD, so it must be inside every candidate key; that observation alone, called the core attribute rule, would have shortcut the search. The unique candidate key is A.'
        },
        {
          id: 'dbms-normalization-q5',
          q: 'A decomposition of R into two relations R1 and R2 is guaranteed lossless (with respect to FD set F) if and only if:',
          options: [
            'R1 intersect R2 is nonempty',
            'R1 intersect R2 functionally determines R1 or functionally determines R2',
            'R1 union R2 equals R',
            'Every FD of F is preserved in R1 or in R2'
          ],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The binary lossless-join test: the decomposition of R into R1 and R2 is lossless exactly when the set of common attributes, R1 intersect R2, is a superkey of at least one of the two components, that is, the common attributes determine all of R1 or all of R2 under F. Intuitively, the shared attributes must act as a key on one side so that each tuple rejoins with exactly its original partner, generating no spurious tuples. Option 1 is necessary in practice but far from sufficient; sharing a non-key attribute is the classic recipe for a lossy join. Option 3 is a precondition of any decomposition (no attribute may be lost) but says nothing about spurious tuples. Option 4 is dependency preservation, an independent property: a decomposition can be lossless without it and vice versa.'
        },
        {
          id: 'dbms-normalization-q6',
          q: 'R(A, B, C, D) has FDs: AB -> C, C -> D, D -> A. How many candidate keys does R have?',
          options: ['1', '2', '3', '4'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'The right sides of the FDs are C, D and A, so B never appears on a right side and must belong to every candidate key. B plus = B, so B alone is not a key; try two-attribute sets containing B. AB plus: AB, add C (AB -> C), add D (C -> D), giving ABCD: key. CB plus: CB, add D (C -> D), add A (D -> A), giving ABCD: key. DB plus: DB, add A (D -> A), then AB -> C adds C, giving ABCD: key. All three minimal (each strictly contains no smaller key since B alone fails and A plus, C plus, D plus each miss B). Hence the candidate keys are AB, BC and BD: 3 keys. A useful corollary: every attribute is prime here, so R is automatically in 3NF.'
        },
        {
          id: 'dbms-normalization-q7',
          q: 'R(A, B, C, D, E) has FDs: A -> BC, CD -> E, B -> D, E -> A. Which of the following is NOT a candidate key of R?',
          options: ['E', 'CD', 'BC', 'BD'],
          answer: 3,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Test each option by closure. E plus: E, add A (E -> A), add BC (A -> BC), add D (B -> D): all five attributes, and E is single, so E is a candidate key. CD plus: CD, add E (CD -> E), add A (E -> A), add B (A -> BC): everything, and neither C plus = C nor D plus = D suffices alone, so CD is a candidate key. BC plus: BC, add D (B -> D), then CD -> E adds E, then E -> A adds A: everything; B plus = BD and C plus = C fail alone, so BC is a candidate key. BD plus: start BD; B -> D adds nothing new; no other left side (A, CD, E) is contained in BD, so BD plus = BD, which misses A, C and E. Therefore BD is not even a superkey and is the answer. Incidentally A is a fourth candidate key of this classic relation.'
        },
        {
          id: 'dbms-normalization-q8',
          q: 'R(A, B, C) has FDs: AB -> C and C -> B. The highest normal form of R is:',
          options: ['1NF', '2NF', '3NF', 'BCNF'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'First find all candidate keys. A appears on no right side (right sides are C and B), so A is in every key. A plus = A, so extend: AB plus = ABC, a key; AC plus: AC, add B (C -> B), giving ABC, a key. So the candidate keys are AB and AC, and every attribute A, B, C is prime. BCNF check: C -> B has left side C, and C plus = CB is not all attributes, so C is not a superkey; BCNF fails. 3NF check on the same FD: the right side B is a prime attribute (it lies in key AB), so the 3NF exemption applies; AB -> C has superkey left side. Hence R is in 3NF but not BCNF. Since all attributes are prime, 2NF holds vacuously as well. Answer: 3NF. This all-attributes-prime situation is the standard 3NF-not-BCNF construction.'
        },
        {
          id: 'dbms-normalization-q9',
          q: 'What is a minimal (canonical) cover of the FD set F = {A -> BC, A -> B, B -> C, AB -> C}?',
          options: [
            '{A -> B, B -> C}',
            '{A -> BC, B -> C}',
            '{A -> B, A -> C, B -> C}',
            '{A -> B, AB -> C}'
          ],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Step 1, split right sides: A -> B, A -> C, A -> B (duplicate), B -> C, AB -> C. Step 2, remove extraneous left attributes: in AB -> C, is A extraneous? Test whether B alone derives C: B -> C is given, yes, so AB -> C reduces to B -> C, already present. Step 3, remove redundant FDs one at a time: is A -> C redundant given {A -> B, B -> C}? A plus under the rest = A, B, then C: yes, redundant, drop it. Is A -> B redundant given {B -> C}? A plus = A: no, keep. Is B -> C redundant given {A -> B}? B plus = B: no, keep. Result: {A -> B, B -> C}. Verify it implies every original FD: A -> BC via transitivity and union, AB -> C via B -> C and augmentation. It is minimal and correct.'
        },
        {
          id: 'dbms-normalization-q10',
          q: 'R(A, B, C, D) has the single candidate key AB and the FDs AB -> CD and B -> C. The highest normal form of R is:',
          options: ['1NF', '2NF', '3NF', 'BCNF'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'With AB as the only candidate key, the prime attributes are A and B; C and D are nonprime. Examine B -> C: the left side B is a proper subset of the candidate key AB, and the right side C is a nonprime attribute. That is precisely a partial dependency, which 2NF forbids. Therefore R fails 2NF and its highest normal form is only 1NF. There is no need to test 3NF or BCNF once 2NF fails, because the forms are nested: failing 2NF automatically rules out the higher forms. The distractor reasoning that leads to 3NF usually skips the 2NF check and jumps straight to asking whether left sides are superkeys. The standard fix is to decompose out the partial dependency: R1(B, C) and R2(A, B, D).'
        },
        {
          id: 'dbms-normalization-q11',
          q: 'R(A, B, C) with FDs {A -> B, B -> C} is decomposed into R1(A, B) and R2(A, C). Which statement is correct?',
          options: [
            'The decomposition is lossless and dependency preserving',
            'The decomposition is lossless but not dependency preserving',
            'The decomposition is lossy but dependency preserving',
            'The decomposition is lossy and not dependency preserving'
          ],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Lossless test: R1 intersect R2 = {A}. Does A determine R1 or R2? A plus = ABC, so A is a key of both components; the test passes and the decomposition is lossless. Dependency preservation: project the FDs. On R1(A, B): A -> B. On R2(A, C): A -> C (derived via transitivity). The union of projected FDs is {A -> B, A -> C}. Does it imply the original B -> C? Compute B plus using only the projected FDs: B plus = B, which does not contain C. So B -> C is lost; enforcing it would require joining R1 and R2 on every update. Hence lossless but not dependency preserving. The dependency-preserving alternative here is R1(A, B), R2(B, C), which is also lossless since B is a key of R2.'
        },
        {
          id: 'dbms-normalization-q12',
          q: 'Consider: S1: Every relation in BCNF is also in 3NF. S2: For every relation and FD set, a lossless, dependency-preserving decomposition into 3NF exists. S3: For every relation and FD set, a lossless, dependency-preserving decomposition into BCNF exists. Which statements are true?',
          options: ['S1 only', 'S1 and S2 only', 'S2 and S3 only', 'S1, S2 and S3'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'S1 is true by definition: the BCNF condition (every nontrivial FD has a superkey left side) is strictly stronger than the 3NF condition, which additionally tolerates prime right sides, so BCNF membership implies 3NF membership. S2 is true: the 3NF synthesis algorithm, which builds one relation per group of FDs in a minimal cover and adds a candidate-key relation if needed, always yields a decomposition that is both lossless and dependency preserving; this guarantee is the main reason 3NF is the practical target. S3 is false: BCNF decomposition can always be made lossless, but dependency preservation is sometimes impossible. The standard witness is R(A, B, C) with FDs {AB -> C, C -> B}: any BCNF decomposition separates AB -> C from a schema where it can be checked. Hence S1 and S2 only.'
        },
        {
          id: 'dbms-normalization-q13',
          q: 'R(A, B, C, D, E) has FDs: AB -> C, C -> D, D -> B, D -> E. The highest normal form of R is:',
          options: ['1NF', '2NF', '3NF', 'BCNF'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Find the candidate keys first. Right sides are C, D, B, E, so A is on no right side and lies in every key; A plus = A, so extend. AB plus: AB, C, D, E: key. AC plus: AC, D (C -> D), B (D -> B), E (D -> E): key. AD plus: AD, B, E, then AB -> C gives C: key. AE plus = AE: not a key. So the candidate keys are AB, AC, AD; prime attributes are A, B, C, D, and E is nonprime. Now check 2NF: D -> E has nonprime right side E, and D is a proper subset of the candidate key AD. That is a partial dependency, so 2NF fails and the highest form is 1NF. The trap is treating D -> E as merely transitive and answering 3NF or 2NF; once D itself became part of a key, its dependency on E became partial.'
        },
        {
          id: 'dbms-normalization-q14',
          q: 'R(A, B, C, D) has FDs F = {A -> B, C -> D} and candidate key AC. Which decomposition below is produced by the standard 3NF synthesis algorithm using a minimal cover of F, and is lossless and dependency preserving?',
          options: [
            'R1(A, B), R2(C, D)',
            'R1(A, B), R2(C, D), R3(A, C)',
            'R1(A, B, C), R2(C, D)',
            'R1(A, C), R2(B, D)'
          ],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'F is already minimal: single-attribute right sides, single-attribute left sides (so no extraneous attributes), and neither FD derives the other. Synthesis creates one relation per FD: R1(A, B) for A -> B and R2(C, D) for C -> D. Then check whether any component contains a candidate key of R: the only candidate key is AC (A and C appear on no right side, and AC plus = ABCD), and neither R1 nor R2 contains both A and C, so the algorithm adds the key relation R3(A, C). Option 1 without R3 is dependency preserving but lossy: joining R1 and R2 has no common attribute chain to reassemble original tuples correctly (R1 and R2 share nothing, producing a Cartesian product). With R3 the decomposition is lossless (join R3 with R1 on key A, then with R2 on key C) and preserves both FDs. Hence option 2.'
        },
        {
          id: 'dbms-normalization-q15',
          q: 'R(A, B, C, D) has FDs: AB -> CD and D -> A. The highest normal form of R is:',
          options: ['1NF', '2NF', '3NF', 'BCNF'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Candidate keys: B appears on no right side (right sides are C, D, A), so B is in every key. B plus = B. AB plus = ABCD: key. DB plus: DB, add A (D -> A), then AB -> CD adds C: key. CB plus = CB: not a key. So the candidate keys are AB and BD; prime attributes A, B, D; nonprime C. 2NF: does any proper subset of a key determine C? A plus = A, B plus = B, D plus = DA; none contains C, and C is determined only by full keys, so 2NF holds. 3NF: AB -> CD has a superkey left side; D -> A has a non-superkey left side but its right side A is prime (A is in key AB), so the 3NF exemption applies: 3NF holds. BCNF: D -> A with D not a superkey violates it. Highest normal form: 3NF.'
        },
        {
          id: 'dbms-normalization-q16',
          q: 'What is a minimal cover of F = {B -> A, D -> A, AB -> D}?',
          options: [
            '{B -> A, D -> A, B -> D}',
            '{B -> D, D -> A}',
            '{B -> A, AB -> D}',
            '{D -> A, B -> A}'
          ],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Right sides are already single attributes. Step 2, extraneous left attributes in AB -> D: test A extraneous by asking whether B alone yields D. Under F, B plus = B, A (via B -> A), then AB -> D fires since A and B are both present, adding D. So B -> D holds and A is extraneous; replace AB -> D with B -> D. Current set: {B -> A, D -> A, B -> D}. Step 3, redundancy: is B -> A redundant given {D -> A, B -> D}? B plus = B, D, A: yes, derivable, drop it. Is D -> A redundant given {B -> D}? D plus = D: no. Is B -> D redundant given {D -> A}? B plus = B: no. Minimal cover: {B -> D, D -> A}. Check it reproduces F: B -> D given; D -> A given; B -> A by transitivity; AB -> D by augmenting B -> D. Option 1 is the intermediate, non-minimal stage.'
        }
      ]
    },
    {
      id: 'dbms-indexing',
      name: 'File Organization & Indexing (B-tree / B+-tree)',
      theory: {
        intro: 'Indexing questions in GATE are arithmetic dressed up as database theory: given a block size, key size and pointer sizes, compute the order of a B+-tree node, the number of index blocks at each level, or the number of disk block accesses for a search. The conceptual layer is small but must be exact: the difference between primary, clustering and secondary indexes, between dense and sparse indexes, and between B-trees and B+-trees. Files sit on disk in blocks; an index is itself a file of (key, pointer) entries, and multilevel indexes shrink the search to a handful of block reads. Because every quantity is an integer count of things that must fit in a block, the whole topic reduces to careful floor and ceiling arithmetic. Learn the two node-capacity inequalities for B+-trees and the level-by-level division for multilevel indexes, and these two-mark questions become nearly free.',
        core: 'FILE ORGANIZATION. A heap (unordered) file appends records anywhere: insertion is cheap, but an equality search scans on average half the blocks. A sequential (ordered) file keeps records sorted on an ordering field, enabling binary search over b blocks in ceiling of log2(b) block accesses, at the cost of expensive inserts. Hashing gives near-constant lookup on the hash key but no efficient range queries.\n\nINDEX TYPES. An index is a sorted file of entries (search-key value, pointer). Primary index: built on the ordering KEY field of a sorted file; one entry per block (anchor record), hence sparse. Clustering index: built on a non-key ordering field; one entry per distinct value; also sparse. Secondary index: built on any non-ordering field; because the file order does not follow the index key, the index must be dense on a key field, one entry per record (for a non-key field, an extra level of indirection with pointer buckets is used). Dense means one entry per record or per distinct value present; sparse means entries for only some values, requiring the data file to be ordered.\n\nMULTILEVEL INDEXES AND B+-TREES. Treat the first-level index as a file and index it again until one block remains; a search then costs one block per level plus one data block. The B+-tree makes this dynamic. An internal node of order p holds up to p tree (block) pointers and p - 1 keys; the capacity constraint is p times blockPointerSize plus (p - 1) times keySize at most blockSize, and the order is the largest integer p satisfying it. A leaf node holds up to pLeaf entries of (key, record pointer) plus one next-leaf block pointer: pLeaf times (keySize + recordPointerSize) plus blockPointerSize at most blockSize. Except for the root, every internal node must be at least half full: at least ceiling of p over 2 pointers; leaves hold at least floor or ceiling of pLeaf over 2 entries depending on convention. All data pointers live in the leaves; leaves are linked left to right, which makes range scans a linked-list walk. Height stays logarithmic: with fanout f and n leaf entries, levels are about log base f of n.\n\nB-TREE VERSUS B+-TREE. A B-tree stores data (record) pointers in every node alongside the keys, and each key appears exactly once in the whole tree. Consequently internal B-tree nodes hold fewer keys (extra record pointers consume space), fanout is lower, and range queries must walk up and down the tree. The B+-tree repeats some keys (an internal key also appears in a leaf), wastes a little space, but gains larger fanout, uniform search cost (every search goes to a leaf), and sequential leaf links. Databases almost universally use B+-trees.\n\nBLOCK ACCESS COUNTING. Sorted file, binary search: ceiling of log2(number of blocks). Multilevel index: number of index levels plus one final data block access. B+-tree search: height of the tree (number of node levels) block reads, plus one more if the leaf stores a record pointer into a separate data file.',
        strategy: 'GATE patterns. (1) Order calculation: write the inequality, solve for p, and take the FLOOR; a fractional node does not exist. Distinguish the internal-node formula (p block pointers, p - 1 keys) from the leaf formula (equal numbers of keys and record pointers, plus one sibling pointer). Read the question to see which pointer sizes differ: block pointers and record pointers are often given different sizes precisely to catch students who mix them. (2) Multilevel index levels: divide and take CEILING repeatedly until one block remains; each division is entries so far over entries per block. (3) Access counting: levels plus one for the data block; binary search uses ceiling of log2. (4) Concept one-markers: primary and clustering indexes are sparse and require an ordered file; a secondary index on a key is dense; B+-tree leaves are linked and hold all record pointers.\n\nWorked mini-example: block 512 bytes, key 8 bytes, block pointer 4 bytes. Internal order: 4p + 8(p - 1) at most 512 gives 12p at most 520, so p = 43. If record pointers are 8 bytes, a leaf holds k(8 + 8) + 4 at most 512, so k = 31. A file of 40000 records then needs ceiling of 40000 over 31 = 1291 leaves, and with fanout up to 43 the tree needs at most three internal levels above the leaves.\n\nTrap list: using record-pointer size in the internal-node formula, forgetting the leaf sibling pointer, taking a ceiling where a floor is required (node capacity floors, block counts ceil), and quoting average instead of worst-case accesses.'
      },
      questions: [
        {
          id: 'dbms-indexing-q1',
          q: 'A primary index is an index on:',
          options: [
            'Any attribute declared as a key',
            'The ordering key field of a sequentially ordered file',
            'A non-ordering field of a heap file',
            'The field with the most distinct values'
          ],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'In the standard file-organization taxonomy, a primary index is defined on the field that both (a) is a key and (b) physically orders the data file. Because the file is sorted on this field, the index need only store one entry per data block, pointing at the first (anchor) record of the block; a binary or tree search on the index followed by one block read finds any record. That makes the primary index a sparse index. Option 1 is a common misreading: an index on a key that does not order the file is a secondary index, not primary. Option 3 describes the typical secondary-index situation. Option 4 is irrelevant to the classification. Companion facts: an ordered non-key field gives a clustering index, and a file can have at most one physical ordering, hence at most one primary or clustering index.'
        },
        {
          id: 'dbms-indexing-q2',
          q: 'A secondary index built on a candidate key field of an unordered file must be:',
          options: [
            'Sparse, with one entry per block',
            'Dense, with one entry per record',
            'Sparse, with one entry per distinct value',
            'Either dense or sparse, at the choice of the designer'
          ],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'A sparse index works only when the data file is physically ordered on the index field: then an index entry per block suffices, because once the right block is located, the record is found inside it by its position in sorted order. A secondary index, by definition, is on a field that does not order the file, so records with adjacent key values are scattered across arbitrary blocks. Skipping any record in the index would make that record unreachable through the index. Hence the index must contain one entry per record, which is the definition of dense. On a non-key field, the variant is one entry per distinct value pointing to a bucket of record pointers, but per-record reachability is still required. So option 2 is correct, and the sparse options describe primary or clustering indexes instead.'
        },
        {
          id: 'dbms-indexing-q3',
          q: 'Which statement about B+-trees is TRUE?',
          options: [
            'Record pointers are stored in both internal nodes and leaf nodes',
            'All record pointers are in the leaves, and the leaves are linked for sequential access',
            'Each key value appears exactly once in the entire tree',
            'Range queries require traversing from the root once per qualifying record'
          ],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The defining design of the B+-tree is the separation of roles: internal nodes hold only keys and child (block) pointers and act purely as a routing structure, while every record pointer resides in a leaf. The leaves are chained left to right by sibling pointers, so a range query descends the tree once to the first qualifying key and then walks the linked leaf list, never revisiting the internal levels; this refutes option 4. Option 1 and option 3 describe the plain B-tree: there, data pointers appear at all levels and each key occurs exactly once, whereas in a B+-tree a key that guides routing in an internal node is repeated down in a leaf. The B+-tree trade: slight key duplication in exchange for higher internal fanout, uniform root-to-leaf search cost, and cheap sequential scans.'
        },
        {
          id: 'dbms-indexing-q4',
          q: 'A clustering index is built on:',
          options: [
            'A non-key field on which the data file is physically ordered',
            'A key field on which the file is not ordered',
            'Any hashed field',
            'A field of an unordered heap file'
          ],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The three classical index types are distinguished by two questions: does the field order the file, and is the field a key? Ordering field and key gives a primary index; ordering field but not a key gives a clustering index; non-ordering field (key or not) gives a secondary index. A clustering index therefore sits on a non-key ordering field, such as department number when the employee file is kept sorted by department: records with equal values are clustered into consecutive blocks, and the index stores one entry per distinct value, pointing to the first block holding that value, making it a sparse index. Option 2 describes a secondary index on a key. Hashing (option 3) is a separate organization with no ordering, and a heap file (option 4) has no ordering field at all, so neither can host a clustering index.'
        },
        {
          id: 'dbms-indexing-q5',
          q: 'Compared with a B+-tree on the same key and block size, an internal node of a B-tree generally has:',
          options: [
            'Higher fanout, because keys are not repeated',
            'Lower fanout, because it also stores record pointers with each key',
            'Exactly the same fanout',
            'No keys, only pointers'
          ],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'In a B-tree, every key at every level carries its data (record) pointer, so an internal node with q children stores q child pointers, q - 1 keys, and additionally q - 1 record pointers. Those record pointers consume block space that a B+-tree internal node instead spends on more keys and child pointers, since a B+-tree internal node holds routing keys and child pointers only. With the same block size, the B-tree node therefore accommodates fewer keys: lower fanout, taller tree, more block accesses per search on average for large files. The compensating B-tree advantage is that a lucky search can stop at an internal node without descending to a leaf, and no key is stored twice. Option 1 inverts the trade-off: the non-repetition of keys does not recover the space cost of the extra pointers.'
        },
        {
          id: 'dbms-indexing-q6',
          q: 'The block size is 512 bytes. A search key occupies 8 bytes and a block pointer occupies 8 bytes. What is the maximum order (maximum number of child pointers) of an internal node of a B+-tree?',
          options: ['31', '32', '33', '64'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'An internal B+-tree node of order p stores p block pointers and p - 1 search keys, all of which must fit in one block: 8p + 8(p - 1) at most 512. Expand: 8p + 8p - 8 at most 512, so 16p at most 520, giving p at most 32.5. The order must be an integer number of pointers, so take the floor: p = 32. Verify: 32 pointers use 256 bytes, 31 keys use 248 bytes, total 504 at most 512, and p = 33 would need 264 + 256 = 520 bytes, overflowing the block. Option 33 comes from rounding up, and option 64 from forgetting the keys entirely (512 over 8). Always solve the inequality exactly, then floor; a node that almost fits does not fit.'
        },
        {
          id: 'dbms-indexing-q7',
          q: 'Block size 1024 bytes, search key 10 bytes, record pointer 8 bytes, block pointer 8 bytes. Each leaf of a B+-tree stores search keys with their record pointers plus one block pointer to the next leaf. What is the maximum number of keys in a leaf node?',
          options: ['51', '56', '57', '64'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'A leaf holding k entries needs k keys (10 bytes each), k record pointers (8 bytes each) and one sibling block pointer (8 bytes): 10k + 8k + 8 at most 1024, so 18k at most 1016, giving k at most 56.44, floor 56. Verify: 56 entries use 56 x 18 = 1008 bytes plus 8 for the sibling pointer = 1016 at most 1024, while 57 entries would need 1026 + 8 bytes and overflow. Option 57 is the round-up error. Option 64 divides 1024 by 16, using the wrong entry size. Note the structural difference from internal nodes: a leaf pairs each key with a record pointer (equal counts) plus one chain pointer, whereas an internal node has one more pointer than keys; mixing the two formulas is the most common exam mistake in this subtopic.'
        },
        {
          id: 'dbms-indexing-q8',
          q: 'Disk block size is 4096 bytes, a key is 12 bytes and a block pointer is 8 bytes. The maximum number of children of an internal B+-tree node is:',
          options: ['204', '205', '206', '341'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Set up the internal-node inequality with p child pointers and p - 1 keys: 8p + 12(p - 1) at most 4096. That is 20p - 12 at most 4096, so 20p at most 4108 and p at most 205.4; flooring gives p = 205. Check: 205 pointers occupy 1640 bytes and 204 keys occupy 2448 bytes, total 4088 at most 4096; with p = 206 the total would be 1648 + 2460 = 4108, which exceeds the block. Option 204 under-floors, and option 341 results from dividing 4096 by 12, ignoring the pointers. As a sanity habit, always substitute the computed order back into the space equation; the correct answer leaves a small slack (here 8 bytes), and the next integer must overflow.'
        },
        {
          id: 'dbms-indexing-q9',
          q: 'A file is stored as a sequentially ordered file occupying 16384 disk blocks. Using binary search on the blocks, the worst-case number of block accesses to find a record by its ordering key is:',
          options: ['13', '14', '15', '16384'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Binary search over b blocks halves the candidate range with each block read, so the worst case needs ceiling of log2(b) accesses. Here b = 16384 = 2 to the power 14, so log2(16384) = 14 exactly and the ceiling is 14 block accesses. Option 13 undercounts by assuming the last comparison is free; after 13 halvings, 2 candidate blocks can remain, and one more read is required to decide. Option 16384 is the cost of a full linear scan of the file, and a linear search of an ordered file would average about half of that. This number is also the baseline that indexes beat: a two-level index over the same file would find the record in about 3 accesses, which is why questions often ask for the difference.'
        },
        {
          id: 'dbms-indexing-q10',
          q: 'A file has 30000 records. A dense secondary index is built in which each index entry is 10 bytes (key plus record pointer), and index blocks are 1000 bytes. How many blocks does the first-level index occupy?',
          options: ['100', '300', '301', '3000'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'A dense secondary index carries one entry per record, so it holds exactly 30000 entries. Entries per block: floor of 1000 over 10 = 100; entries cannot straddle blocks, so the capacity floors, though here the division is exact. Number of index blocks: ceiling of 30000 over 100 = 300. Option 3000 divides records by entries-per-block incorrectly (30000 over 10), and option 301 adds a phantom partial block that does not exist because 30000 is a multiple of 100. Follow-up numbers worth knowing: binary search on the 300 index blocks costs ceiling of log2(300) = 9 accesses plus 1 data block = 10 total, and building a second index level over the 300 blocks (3 blocks, then 1) would cut the search to about 3 accesses.'
        },
        {
          id: 'dbms-indexing-q11',
          q: 'In a B-tree of order p (maximum p children per node), the minimum number of keys in a non-root internal node is:',
          options: [
            'ceil(p / 2)',
            'ceil(p / 2) - 1',
            'floor(p / 2) + 1',
            'p - 1'
          ],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The balance guarantee of B-trees and B+-trees comes from the half-full rule: every node except the root must have at least ceiling of p over 2 children. A node with c children always contains exactly c - 1 keys, so the minimum key count for a non-root internal node is ceiling of p over 2, minus 1. For example, with order p = 5 each non-root internal node has between 3 and 5 children and therefore between 2 and 4 keys. The root is exempt and may have as few as 2 children (or be a leaf). Option 1 is the minimum number of children, not keys. This rule is what bounds the height: with n keys the height is O(log base ceil(p/2) of n), and it drives the splitting (overflow) and merging (underflow) behavior during insertion and deletion.'
        },
        {
          id: 'dbms-indexing-q12',
          q: 'A file has 100000 records of 100 bytes each, stored unspanned in blocks of 4096 bytes and ordered on its key. A sparse primary index has 20-byte entries (key plus block pointer), one entry per data block, and index blocks are also 4096 bytes. How many index levels does the resulting multilevel index have (counting every index level, not the data file)?',
          options: ['1', '2', '3', '4'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Blocking factor of the data file: floor of 4096 over 100 = 40 records per block (unspanned storage floors). Data blocks: ceiling of 100000 over 40 = 2500. The sparse first-level index has one entry per data block: 2500 entries. Index blocking factor: floor of 4096 over 20 = 204 entries per block. First-level index blocks: ceiling of 2500 over 204 = 13 (since 12 x 204 = 2448 < 2500). Second level indexes those 13 blocks: ceiling of 13 over 204 = 1 block, and the process stops once a level fits in one block. Total index levels: 2. A search then costs 2 index block reads plus 1 data block read = 3 accesses, versus ceiling of log2(2500) = 12 for binary search on the raw file. The frequent slips are using 41 as the blocking factor (ceiling instead of floor) and forgetting to stop at one block.'
        },
        {
          id: 'dbms-indexing-q13',
          q: 'A B+-tree has 3 node levels: the root, one internal level, and the leaf level. Every internal node (including the root) can hold at most 5 child pointers, and every leaf can hold at most 4 keys. What is the maximum number of keys the leaf level can store?',
          options: ['80', '100', '125', '20'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Work level by level at full capacity. The root holds at most 5 child pointers, so at most 5 internal nodes exist on the middle level. Each of those holds at most 5 child pointers, so the leaf level has at most 5 x 5 = 25 leaves. Each leaf stores at most 4 keys, so the leaf level stores at most 25 x 4 = 100 keys. Option 125 wrongly treats the leaves as if they also fanned out (5 cubed), option 80 miscounts the middle level as 4 nodes by confusing keys (4 per internal node) with pointers (5 per internal node), and option 20 forgets the middle level entirely. The general formula: with internal order p and leaf capacity k, a tree with h internal levels stores at most p to the power h, times k keys; minimum-capacity versions of the same question use ceiling of p over 2 instead of p below the root.'
        },
        {
          id: 'dbms-indexing-q14',
          q: 'Block size 1024 bytes, search key 12 bytes, block pointer 6 bytes, record pointer 10 bytes. For a B+-tree, what are the maximum order p of an internal node (number of child pointers) and the maximum number of keys in a leaf (leaves also store one sibling block pointer)?',
          options: [
            'p = 57, leaf keys = 46',
            'p = 56, leaf keys = 46',
            'p = 57, leaf keys = 47',
            'p = 58, leaf keys = 45'
          ],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Internal node: p block pointers of 6 bytes and p - 1 keys of 12 bytes must fit: 6p + 12(p - 1) at most 1024, so 18p at most 1036 and p at most 57.55; floor gives p = 57. Check: 57 x 6 + 56 x 12 = 342 + 672 = 1014 at most 1024; p = 58 would need 348 + 684 = 1032, overflow. Leaf node: k keys with k record pointers plus one sibling block pointer: 12k + 10k + 6 at most 1024, so 22k at most 1018 and k at most 46.27; floor gives 46. Check: 46 x 22 + 6 = 1018 at most 1024; 47 entries would need 1040. Answer: p = 57 and 46 leaf keys. The question deliberately gives different sizes for block and record pointers; using the 10-byte record pointer in the internal formula (yielding 47) or the 6-byte block pointer in the leaf formula are the planted mistakes.'
        },
        {
          id: 'dbms-indexing-q15',
          q: 'A file of 50000 records is unordered. A dense secondary index on its key has 16-byte entries and 4096-byte index blocks, organized as a multilevel index. How many block accesses does an equality search on the key need in the worst case (index levels plus the data block)?',
          options: ['2', '3', '4', '197'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Entries per index block: floor of 4096 over 16 = 256. First-level index: one entry per record (dense), so ceiling of 50000 over 256 = 196 blocks (195 x 256 = 49920 < 50000). Second level: ceiling of 196 over 256 = 1 block, so the multilevel index has 2 levels. A search reads one block per index level, top down: the single second-level block, then the correct first-level block, obtaining the record pointer, and finally the data block itself: 2 + 1 = 3 block accesses. Option 197 is the cost of binary-searching the first level plus data without building upper levels incorrectly scaled; actually binary search would cost ceiling of log2(196) = 8 plus 1 = 9. Option 2 forgets the data block, and option 4 invents a third index level that does not exist since level two already fits in one block.'
        }
      ]
    },
    {
      id: 'dbms-transactions',
      name: 'Transactions & Concurrency Control',
      theory: {
        intro: "A transaction is a unit of work that must appear to execute atomically and in isolation even though the DBMS actually interleaves many transactions' operations to keep the system responsive. GATE tests this topic through the ACID properties, through building and reading precedence graphs to judge conflict serializability, through the weaker but more permissive notion of view serializability, through the recoverability hierarchy (recoverable, cascadeless, strict) that governs how safely a system can handle aborts, and through the concurrency-control protocols - two-phase locking and timestamp ordering - that enforce serializability in practice. Almost every year produces at least one 'is this schedule serializable' question and one conceptual question distinguishing strict 2PL from plain 2PL or from timestamp ordering. The topic rewards a small number of precise mechanical procedures applied carefully rather than intuition.",
        core: "ACID. Atomicity: a transaction's effects are all-or-nothing - implemented via logging and rollback/undo. Consistency: a transaction takes the database from one consistent state to another, preserving declared invariants (this is a property the application and constraints must guarantee, not the concurrency-control subsystem). Isolation: concurrently executing transactions must not observe each other's intermediate, uncommitted state - enforced by concurrency control. Durability: once committed, a transaction's effects survive any subsequent failure - implemented via write-ahead logging and stable storage.\n\n• Schedules and conflict serializability. A schedule is a specific interleaving of the operations of several transactions; a serial schedule runs transactions one after another with no interleaving at all and is trivially correct. Two operations conflict when they belong to different transactions, access the same data item, and at least one of them is a write. A schedule is conflict serializable if it can be transformed into some serial schedule by repeatedly swapping adjacent non-conflicting operations - equivalently, and far faster to check, if its precedence (serialization) graph has no cycle. Build the precedence graph by adding a node per transaction and, for every pair of conflicting operations where Ti's operation occurs before Tj's operation in the schedule, drawing an edge Ti -> Tj. If the graph is acyclic, any topological order of the nodes is an equivalent serial order; if it has a cycle, the schedule is not conflict serializable, full stop.\n\n• View serializability. This is a strictly weaker (more permissive) equivalence: schedules S1 and S2 are view equivalent if (a) for every data item, if a transaction reads the initial value in S1, it also reads the initial value in S2; (b) if Ti reads a value written by Tj in S1 (a 'reads-from' relationship), the same holds in S2; and (c) the transaction that performs the final write on each data item is the same in both schedules. Every conflict-serializable schedule is view serializable, but the converse fails specifically in the presence of blind writes (a write not preceded by a read of the same item by the same transaction) - a schedule with blind writes can satisfy all three view-equivalence conditions against some serial order while its precedence graph still contains a cycle. View serializability is rarely enforced in real systems because checking it is NP-hard in general, unlike the polynomial-time cycle check for conflict serializability.\n\n• Recoverability hierarchy. A schedule is recoverable if, whenever Tj reads a data item previously written by Ti, Ti commits before Tj commits - this ensures that once Tj commits, it can never need to be undone because Ti later aborted. A schedule is cascadeless (avoids cascading rollback) if Tj is only allowed to read an item written by Ti after Ti has already committed - stronger than mere recoverability, since it forbids dirty reads outright rather than merely ordering the commits afterward; every cascadeless schedule is recoverable but not vice versa. A schedule is strict if a transaction may neither read nor write a data item until the transaction that last wrote that item has committed or aborted - strict schedules are automatically cascadeless (and hence recoverable), and strictness additionally makes it trivial to undo an aborted transaction by simply restoring old values, since no other transaction could have built on top of its uncommitted writes.\n\n• Two-phase locking (2PL). Every transaction is divided into a growing phase, during which it may only acquire locks, and a shrinking phase, during which it may only release locks, with no acquisition allowed after the first release. 2PL guarantees conflict serializability (the resulting schedules always have an acyclic precedence graph) but does not by itself prevent cascading rollbacks and does not prevent deadlock. Strict 2PL strengthens this by holding all exclusive (write) locks until the transaction commits or aborts (shared locks may still be released early) - this guarantees both conflict serializability and cascadelessness, and is what most commercial systems implement. Rigorous 2PL goes further still, holding ALL locks (shared and exclusive alike) until commit or abort - this guarantees, as a bonus, that the transactions' serialization order exactly matches their commit order, which simplifies recovery and replication.\n\n• Timestamp ordering (TO). Each transaction T is assigned a unique timestamp TS(T) at start, and every data item Q keeps a read-timestamp R-TS(Q) and write-timestamp W-TS(Q) recording the timestamp of the youngest transaction that read or wrote it. Basic TO rule: a read by T on Q is rejected (T is rolled back and restarted with a new, larger timestamp) if TS(T) < W-TS(Q), since T would be reading a value that a 'younger' transaction has already overwritten, violating the timestamp order; otherwise the read proceeds and R-TS(Q) is updated to max(R-TS(Q), TS(T)). A write by T on Q is rejected if TS(T) < R-TS(Q) or TS(T) < W-TS(Q) (an 'older' transaction trying to overwrite a value already read or written by a 'younger' one); otherwise the write proceeds and W-TS(Q) is set to TS(T). The Thomas write rule relaxes this slightly: when TS(T) < W-TS(Q), the write is simply ignored (not applied, transaction not rolled back) since a younger write has already superseded it - this can permit some view-serializable-but-not-conflict-serializable schedules. TO guarantees serializability by construction (transactions are ordered by their timestamps) and is deadlock-free (no transaction ever waits for a lock), but it can cause more rollbacks/restarts than locking under some workloads and provides no recoverability guarantee on its own - commit-based commit rules are layered on top.\n\n• Concurrency anomalies without control. Lost update: T1 and T2 both read the same value, each computes a new value based on that stale read, and whichever writes second overwrites (silently loses) the other's update. Dirty read: T2 reads a value written by uncommitted T1; if T1 later aborts, T2 has used a value that never really existed. Unrepeatable read: T1 reads an item twice within its own execution, and a committed update by another transaction in between causes the two reads to return different values, violating T1's expectation of a stable view.",
        strategy: "GATE's favorite pattern is a short schedule (typically two or three transactions, 6-10 operations, written inline like r1(A) w1(A) r2(A) w2(A)) followed by 'is this schedule conflict serializable, and if so what is an equivalent serial order.' The mechanical drill: list every data item, list the operations touching it in schedule order, mark every cross-transaction pair with at least one write, draw the directed edge, then hunt for a cycle - do not skip to intuition, because interleavings that 'look fine' frequently hide a cycle and vice versa. A second very common pattern gives a schedule with at least one blind write and asks to distinguish view serializable from conflict serializable - the tell is a write with no preceding read of the same item by the same transaction earlier in that transaction. A third pattern names a schedule and asks whether it is recoverable, cascadeless, both, or neither - trace exactly where each commit falls relative to the reads/writes that depend on it; recoverable only constrains commit order, cascadeless constrains reads directly against commits, and strict constrains both reads and writes against commits/aborts.\n\nWorked mini-example: S = r1(A) w2(A) r3(A) w1(B) r2(B) w3(B). On A: r1(A) before w2(A) gives T1->T2; w2(A) before r3(A) gives T2->T3. On B: w1(B) before r2(B) gives T1->T2; w1(B) before w3(B) gives T1->T3; r2(B) before w3(B) gives T2->T3. All edges are T1->T2, T2->T3, T1->T3 - acyclic, so S is conflict serializable, equivalent to the serial order T1, T2, T3.\n\nTraps to watch: two reads never conflict, so r-r pairs contribute no edge; operations within the same transaction never contribute an edge (order within a transaction is fixed anyway); 2PL guarantees serializability but NOT freedom from deadlock or cascading rollback - only strict/rigorous 2PL adds cascadelessness; and 'recoverable' does not imply 'cascadeless' - a schedule can commit transactions in the right relative order while still letting an uncommitted read of dirty data slip through in the middle."
      },
      questions: [
        {
          id: 'dbms-transactions-q1',
          q: 'Which ACID property is primarily enforced by the concurrency-control subsystem of a DBMS?',
          options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Isolation demands that concurrently running transactions behave as though they executed one at a time, never observing each other's uncommitted intermediate states - this is exactly what concurrency-control protocols such as two-phase locking and timestamp ordering are designed to guarantee by controlling the order and visibility of conflicting operations. Atomicity (all-or-nothing effects) is instead the job of the recovery/logging subsystem, which uses the log to undo a failed transaction's partial writes. Durability (committed effects survive crashes) is also a recovery-manager responsibility, achieved through write-ahead logging to stable storage. Consistency is largely an application-level guarantee - the DBMS enforces declared constraints, but preserving business-logic invariants is the transaction author's responsibility. Isolation, option C, is the one directly implemented by scheduling and locking."
        },
        {
          id: 'dbms-transactions-q2',
          q: 'Two operations in a schedule are said to conflict when',
          options: [
            'they belong to the same transaction and access different data items',
            'they belong to different transactions, access the same data item, and at least one of them is a write',
            'they belong to different transactions and both read the same data item',
            'they access different data items regardless of transaction or operation type'
          ],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Conflict is defined precisely to capture when the ORDER of two operations can change the outcome: two operations conflict exactly when they come from different transactions, touch the same data item, and at least one is a write - read-read pairs never conflict because reading twice in either order leaves the same value visible to both, and swapping their order changes nothing observable. Same-transaction pairs are irrelevant here because a transaction's own internal order is fixed by its program and never gets reordered. Different data items also never conflict since operations on unrelated items can always be reordered freely without affecting anything. Option B captures exactly the read-write, write-read, and write-write cases across transactions, which is the standard textbook definition used to build precedence graphs."
        },
        {
          id: 'dbms-transactions-q3',
          q: 'In the precedence (serialization) graph built from a schedule, an edge Ti -> Tj is drawn when',
          options: [
            'Ti and Tj access disjoint sets of data items',
            'Ti has more operations in the schedule than Tj',
            'an operation of Ti conflicts with a later operation of Tj on the same data item',
            'Ti commits strictly before Tj starts'
          ],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "The precedence graph has one node per transaction, and a directed edge Ti -> Tj is added precisely when some operation of Ti appears earlier in the schedule than some conflicting operation of Tj on the same data item - meaning Ti's access had to 'happen first' for the interleaving to make sense, so any equivalent serial order must place Ti before Tj. Option A is irrelevant since disjoint data items never produce conflicts or edges. Option B (operation count) has nothing to do with conflicts. Option D describes commit ordering, which matters for recoverability, not for conflict serializability - the precedence graph is built purely from the relative order of conflicting reads and writes, regardless of when (or whether) each transaction eventually commits. The graph being acyclic is exactly the condition for conflict serializability."
        },
        {
          id: 'dbms-transactions-q4',
          q: 'T1 reads account balance A (value 100) and computes A - 20. T2, interleaved with T1, also reads A (value 100, before T1 writes) and computes A + 50. T1 writes A = 80 and commits; then T2 writes A = 150 and commits. What anomaly has occurred, and what is the final value of A?',
          options: ['Dirty read; final A = 80', 'Lost update; final A = 150', 'Unrepeatable read; final A = 130', 'No anomaly; final A = 130'],
          answer: 1,
          marks: 2,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Both T1 and T2 read the same stale value of A (100) before either had written anything back, so each computed its new value from an outdated base rather than from the other's update. T1 writes 80, but then T2, oblivious to T1's write, overwrites A with 150 (100 + 50) - T1's decrement is completely wiped out and lost, even though both transactions committed successfully. This is the textbook lost update anomaly, and the final value in the database is 150, matching T2's write since it happened last - not 130, which would be the value only if the updates had been correctly composed as 100 - 20 + 50. Preventing this requires concurrency control (e.g., locking A for the read-modify-write duration) so that T2's read is forced to happen after T1's write, or is blocked until T1 finishes."
        },
        {
          id: 'dbms-transactions-q5',
          q: 'T1 writes X = 500 (not yet committed). T2 reads X and gets 500, then commits and uses that value to update another table. T1 subsequently aborts, rolling X back to its original value of 300. What has occurred?',
          options: ['Lost update', 'Dirty read', 'Unrepeatable read', 'Phantom read'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "T2 read a value (500) that T1 had written but not yet committed - a 'dirty' value. Because T1 subsequently aborted, that value never actually became permanent; T2 has already committed based on data that turned out to be false, and since T2 has committed, this cannot even be fixed by cascading its rollback - the database is left inconsistent. This is precisely the dirty read anomaly, option B, and it is exactly what cascadeless (and strict) schedules are designed to prevent by never letting a transaction read a value written by an uncommitted transaction. Lost update (A) involves two transactions overwriting each other's work based on stale reads, not reading uncommitted data. Unrepeatable read (C) involves the SAME transaction re-reading and getting a different value after another transaction's COMMITTED write. Phantom read concerns new rows appearing under a range query, not a dirty value on an existing item."
        },
        {
          id: 'dbms-transactions-q6',
          q: 'Consider the schedule S = r1(A) r2(A) w1(A) r1(B) w2(A) w1(B) r2(B) w2(B), where transaction subscripts denote T1 and T2. Is S conflict serializable?',
          options: [
            'Yes, equivalent to the serial order T1, T2',
            'Yes, equivalent to the serial order T2, T1',
            'No, the precedence graph contains a cycle',
            'Cannot be determined without knowing the actual data values'
          ],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Focus on data item A alone, where the operations in order are r1(A), r2(A), w1(A), w2(A). The pair r1(A) before w2(A) gives an edge T1 -> T2. The pair r2(A) before w1(A) gives an edge T2 -> T1. Both edges already exist from data item A alone, so the precedence graph has a 2-cycle T1 -> T2 -> T1 regardless of what happens on B - no topological order can respect both edges simultaneously. Therefore S is NOT conflict serializable, and no serial order (neither T1,T2 nor T2,T1) is conflict-equivalent to it: option C. This schedule is the standard illustration of why you must check every conflicting pair on every shared data item rather than stopping after finding one edge - it also shows that interleavings that superficially resemble a serial execution on one item can still be irreparably tangled on another."
        },
        {
          id: 'dbms-transactions-q7',
          q: 'Consider the schedule S = r1(A) w2(A) r3(A) w1(B) r2(B) w3(B), where subscripts denote T1, T2, T3. Which serial order is conflict-equivalent to S?',
          options: ['T1, T2, T3', 'T2, T1, T3', 'T3, T1, T2', 'T1 and T2 are not orderable relative to T3'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "On data item A (operations r1(A), w2(A), r3(A) in that order): r1(A) before w2(A) gives T1 -> T2; w2(A) before r3(A) gives T2 -> T3. On data item B (operations w1(B), r2(B), w3(B) in that order): w1(B) before r2(B) gives T1 -> T2; w1(B) before w3(B) gives T1 -> T3; r2(B) before w3(B) gives T2 -> T3. Collecting all edges: T1 -> T2, T2 -> T3, T1 -> T3 - every edge points 'forward' consistently, the graph is acyclic, and its unique topological order is T1, T2, T3, option A. Because the graph already has the direct edge T1 -> T3 in addition to the path through T2, there is no ambiguity about T1's and T3's relative order, ruling out option D. This schedule is a clean example of an interleaved-but-serializable execution with three participants."
        },
        {
          id: 'dbms-transactions-q8',
          q: 'Consider the schedule S = r1(A) w2(A) w1(A) w3(A), where T2 and T3 perform blind writes on A (a write with no prior read of A by that same transaction). Which of the following is true of S?',
          options: [
            'S is conflict serializable, equivalent to T1, T2, T3',
            'S is view serializable but not conflict serializable',
            'S is neither view serializable nor conflict serializable',
            'S is conflict serializable but not view serializable'
          ],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "Check conflict serializability first via the precedence graph on A (order r1(A), w2(A), w1(A), w3(A)): r1(A) before w2(A) gives T1 -> T2; r1(A) before w3(A) gives T1 -> T3; w2(A) before w1(A) gives T2 -> T1; w2(A) before w3(A) gives T2 -> T3; w1(A) before w3(A) gives T1 -> T3. The pair T1 -> T2 and T2 -> T1 forms an immediate 2-cycle, so S is NOT conflict serializable. Now check view serializability against the candidate serial order T1, T2, T3: (a) reads-from - the only read is r1(A), which in S reads the initial value of A (nothing was written before it), and in the serial order T1,T2,T3, T1 also runs first and reads the initial value - matches. (b) final writer of A - in S the last write is w3(A) by T3; in the serial order T1,T2,T3, T3 also writes last - matches. Both view-equivalence conditions hold (there are no other reads to check), so S IS view serializable, equivalent to T1,T2,T3, even though it is not conflict serializable - option B. This is the standard minimal demonstration that view serializability strictly generalizes conflict serializability, with the gap opened exactly by the blind writes on T2 and T3."
        },
        {
          id: 'dbms-transactions-q9',
          q: 'Schedule S = w1(A) r2(A) c1 w2(B) c2 (ci denotes the commit of Ti). Which of the following correctly classifies S?',
          options: [
            'Recoverable and cascadeless',
            'Recoverable but not cascadeless',
            'Not recoverable',
            'Strict but not recoverable'
          ],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "T2 reads A after T1 has written it but BEFORE T1 commits (r2(A) occurs before c1 in the schedule) - this is a dirty read, so S is not cascadeless: had T1 aborted instead of committing, T2 would already have consumed an uncommitted value and would need to be rolled back too (cascading rollback). However, recoverability only requires that if Tj reads data written by Ti, then Ti must COMMIT BEFORE Tj commits - and here c1 does occur before c2 in the schedule, so this weaker condition is satisfied: once T2 commits, T1 has already safely committed too, so T2's commit can never later be invalidated by T1 aborting. So S is recoverable (satisfying the weaker requirement on commit order) but not cascadeless (failing the stronger requirement on when reads may occur) - option B. It is certainly not strict either, since strictness would additionally forbid the read r2(A) entirely until T1 commits or aborts."
        },
        {
          id: 'dbms-transactions-q10',
          q: 'Schedule S = w1(A) r2(A) w2(B) c2 c1. Which of the following correctly classifies S?',
          options: ['Recoverable', 'Not recoverable', 'Cascadeless', 'Strict'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "T2 reads A, a value written by T1, and then T2 COMMITS (c2) before T1 commits (c1 comes last in the schedule). This directly violates the recoverability condition, which requires Ti (the writer T1) to commit before Tj (the reader T2) commits. Because T2 has already committed - meaning its effects are now permanent and cannot be undone - if T1 subsequently aborts, there is no way to fix the database: T2's committed state depended on a value that turned out to never have existed. This is exactly the scenario recoverability is meant to rule out, so S is NOT recoverable, option B - and since recoverable is the weakest of the three properties in this hierarchy, failing it means S also fails to be cascadeless or strict (both of which imply recoverability). This schedule is the standard example motivating why real systems enforce at least strict, and usually strict 2PL, rather than allowing arbitrary recoverable-only interleavings."
        },
        {
          id: 'dbms-transactions-q11',
          q: 'Which of the following statements about two-phase locking (2PL) is CORRECT?',
          options: [
            'Plain 2PL guarantees both conflict serializability and freedom from deadlock',
            'Plain 2PL guarantees conflict serializability but not freedom from deadlock or cascading rollback',
            'Plain 2PL guarantees freedom from deadlock but not serializability',
            'Plain 2PL guarantees cascadelessness but not serializability'
          ],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "The two-phase locking rule (no lock acquisition after the first lock release, per transaction) is precisely engineered to force the resulting precedence graph to be acyclic - it can be proven that any schedule legal under 2PL is conflict serializable. But 2PL says nothing about WHEN locks are released relative to commit: a transaction may release a lock, allowing another transaction to read or write that item, and only commit later - if the first transaction then aborts, the second may need a cascading rollback, so cascadelessness is not guaranteed. Nor does 2PL prevent deadlock: two transactions can each hold a lock the other needs and both be legally within their growing phase while waiting, producing a circular wait. So option B is the accurate, complete statement; options A, C, and D each attribute to plain 2PL a guarantee it does not provide on its own (those require strict or rigorous variants layered on top, or a separate deadlock prevention/detection scheme)."
        },
        {
          id: 'dbms-transactions-q12',
          q: 'How does strict two-phase locking differ from plain two-phase locking, and what does it additionally guarantee?',
          options: [
            'It requires read locks (only) to be held until commit; it guarantees freedom from deadlock',
            'It requires all locks to be acquired at the very start of the transaction; it guarantees conflict serializability',
            'It requires exclusive (write) locks to be held until the transaction commits or aborts; it guarantees cascadelessness in addition to conflict serializability',
            'It removes the shrinking phase entirely; it guarantees strict serializability of reads only'
          ],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Strict 2PL keeps the ordinary 2PL growing/shrinking structure but adds one extra rule: exclusive (write) locks specifically must not be released until the transaction commits or aborts (shared/read locks may still be released earlier, during the shrinking phase). Because no other transaction can read or overwrite a data item that a transaction has written until that writer finally commits or aborts, no transaction can ever build on top of another's uncommitted write - this is exactly what eliminates the possibility of a dirty read and hence the need for cascading rollback, giving cascadelessness on top of the conflict serializability plain 2PL already provides. Option A wrongly restricts the requirement to read locks (it is write locks that must be held). Option B describes conservative 2PL, a different variant aimed at deadlock avoidance, not strictness, and it does not by itself add cascadelessness. Option D is simply wrong terminology - strict 2PL retains the shrinking phase, it just delays it for exclusive locks until transaction end."
        },
        {
          id: 'dbms-transactions-q13',
          q: 'Under rigorous two-phase locking, which additional guarantee holds compared to strict two-phase locking?',
          options: [
            'Rigorous 2PL is deadlock-free, unlike strict 2PL',
            'The order in which transactions commit exactly matches their conflict-serialization order',
            'Rigorous 2PL no longer requires acquiring locks before accessing data',
            'Rigorous 2PL allows a transaction to upgrade a shared lock to exclusive at any time, even during shrinking'
          ],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "Rigorous 2PL strengthens strict 2PL by requiring ALL locks - shared as well as exclusive - to be held until the transaction commits or aborts, not just the write locks. A consequence of this stronger discipline is that if Ti's operations must precede Tj's conflicting operations in the schedule (forcing an edge Ti -> Tj in the precedence graph), then Ti must still be holding the relevant lock when Tj first tries to access that item, which means Ti cannot have committed before Tj even STARTS conflicting with it in a way that would place Tj first - working through the implications, this forces transactions to commit in exactly the same relative order as their serialization (precedence-graph) order, which is a convenient guarantee for recovery and for replicated/distributed systems that want commit order to reflect logical order. It does not by itself grant deadlock freedom (option A is false - both variants can deadlock since both make transactions wait for locks); it does not relax lock acquisition (option C is backwards); and lock upgrades are unrelated to the strict-versus-rigorous distinction and would need to happen before shrinking begins in any 2PL variant, not 'at any time' (option D is false)."
        },
        {
          id: 'dbms-transactions-q14',
          q: 'T1 holds an exclusive lock on data item A and is waiting to acquire a lock on B. T2 holds an exclusive lock on data item B and is waiting to acquire a lock on A. Both transactions are following the two-phase locking protocol correctly. What is the situation, and what does 2PL alone do about it?',
          options: [
            'This is impossible under 2PL; 2PL prevents this configuration from arising',
            'This is a deadlock; 2PL guarantees serializability but does not by itself prevent or resolve deadlock',
            'This is a lost update; 2PL prevents it by aborting the older transaction automatically',
            'This is fine as long as both transactions eventually commit in timestamp order'
          ],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Each transaction is legitimately within its growing phase (still only acquiring locks, never having released one), so both are 2PL-compliant, yet T1 waits on a lock T2 holds and T2 waits on a lock T1 holds - a circular wait with no possible progress: a deadlock. Two-phase locking's proof of correctness only concerns the SHAPE of the resulting precedence graph when transactions do eventually complete; it says nothing about liveness, and by itself provides no mechanism to detect or break such a cycle. Real systems must layer a separate deadlock-handling scheme on top of 2PL: either detection (periodically build a wait-for graph over blocked transactions and abort one transaction on every cycle found) or prevention (timestamp-based schemes such as wait-die or wound-wait, which decide whether an older or younger transaction must abort before circular waiting can occur). Option A is false since this configuration is exactly what 2PL permits; options C and D misdescribe the anomaly and offer a fix 2PL does not provide."
        },
        {
          id: 'dbms-transactions-q15',
          q: 'Under the basic timestamp ordering protocol, data item Q currently has R-timestamp(Q) = 8 and W-timestamp(Q) = 6. Transaction T, with timestamp TS(T) = 5, requests a write on Q. What happens?',
          options: [
            'The write proceeds and W-timestamp(Q) is updated to 5',
            'The write is rejected and T is rolled back, since TS(T) = 5 is less than R-timestamp(Q) = 8',
            'The write is silently ignored, but T is allowed to continue (Thomas write rule applies automatically)',
            'The write proceeds because TS(T) = 5 is greater than W-timestamp(Q) = 6 is false, so the check does not apply'
          ],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: "The basic timestamp-ordering write rule rejects (rolls back) T's write on Q whenever TS(T) is less than R-timestamp(Q) OR TS(T) is less than W-timestamp(Q) - because a transaction older than the youngest reader or writer of Q trying to write now would violate the timestamp order the protocol is enforcing (some younger transaction has already read or overwritten Q, so an older transaction's write must not be allowed to appear as if it happened earlier). Here TS(T) = 5 is less than R-timestamp(Q) = 8, so the rejection condition is triggered on the read-timestamp check alone (it does not even matter that TS(T) = 5 is also less than W-timestamp(Q) = 6, though that too would independently trigger rejection) - the write is rejected and T must be rolled back and restarted with a fresh, larger timestamp: option B. Option C would only apply under the Thomas write rule variant, which modifies the response specifically to the TS(T) < W-timestamp(Q) case by ignoring the obsolete write rather than aborting T - and even then, that variant does not override a violation triggered by the read-timestamp check, which still forces a rollback. Under plain basic TO (as stated in the question), the write is rejected outright."
        },
        {
          id: 'dbms-transactions-q16',
          q: 'Which of the following is a correct comparison between timestamp ordering (TO) and two-phase locking (2PL) for enforcing serializability?',
          options: [
            'TO can deadlock while 2PL cannot',
            '2PL guarantees serializability by lock discipline and can deadlock; TO guarantees serializability by fixed transaction ordering and is inherently deadlock-free, since transactions never wait for one another',
            'Both TO and 2PL require transactions to declare all data items they will access in advance',
            'TO produces conflict-serializable schedules while 2PL only produces view-serializable schedules'
          ],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "2PL enforces serializability structurally, through the acquire-then-release lock discipline, but because transactions genuinely wait (block) for locks held by others, circular waiting - deadlock - is possible and must be handled separately by detection or a prevention scheme. Timestamp ordering takes a completely different approach: every transaction is assigned a timestamp up front, and the protocol simply refuses (rolls back) any operation that would violate the resulting fixed serialization order rather than making transactions wait for each other at all - since there is no waiting, there is no possibility of a circular wait, so TO is inherently deadlock-free, at the cost of potentially more rollbacks and restarted transactions under high contention. This makes option B the accurate comparison, and directly contradicts option A, which has the deadlock behavior backwards. Option C is false - advance declaration of the entire read/write set is a feature of conservative 2PL specifically, not of TO or of plain 2PL in general. Option D mischaracterizes both: TO produces conflict-serializable schedules by construction (transactions execute in an order consistent with their timestamps, which is itself a valid serial order), and 2PL likewise produces conflict-serializable schedules, not merely view-serializable ones."
        }
      ]
    }
]};

window.GATE_DATA.questions['dbms'].topics.find(function(t){return t.id==='dbms-er';}).theory.deep = "DEEP THEORY: ENTITY-RELATIONSHIP MODEL\n\nCORE CONSTRUCTS\n• Entity: a distinguishable real-world object with existence independent of other entities. Entity set: a collection of entities of the same type sharing the same attributes.\n• Attribute: a property of an entity/relationship. Types: simple (atomic, e.g. Age) vs composite (splits further, e.g. Name -> First+Last); single-valued vs multi-valued (e.g. Phone numbers, drawn as double ellipse); stored vs derived (e.g. Age derived from DOB, drawn as dashed ellipse).\n• Relationship: an association among two or more entities. Relationship set: a collection of relationships of the same type. Degree: unary (recursive, e.g. Employee manages Employee), binary (most common), ternary (three entities; NOT generally decomposable into three binary relationships without loss of information — GATE trap).\n• Descriptive attribute: an attribute attached to a relationship itself, not to any participating entity (e.g. Date on a Works_On relationship between Employee and Project).\n\nKEYS\n• Super key: any attribute set that uniquely identifies an entity.\n• Candidate key: a minimal super key (no proper subset is also a super key).\n• Primary key: the candidate key chosen by the designer to identify tuples; underlined in ER diagrams.\n• Composite key: a candidate/primary key made of more than one attribute.\n• Partial key (discriminator): the attribute(s) of a weak entity that distinguish its entities only among those owned by the SAME owner entity — dashed underline in diagrams.\n\nWEAK ENTITIES AND AGGREGATION\n• Weak entity set: has no candidate key of its own (its attributes alone cannot guarantee uniqueness); it depends on identifying (owner) entity for existence and uniqueness. Drawn as a double rectangle, connected to the owner via an identifying relationship drawn as a double diamond, with TOTAL participation of the weak entity in that identifying relationship (mandatory — a weak entity cannot exist without its owner).\n• The primary key of the weak entity's table = (owner's primary key) + (weak entity's partial/discriminator key). E.g. Dependent(weak, partial key Name) owned by Employee(SSN) via identifying relationship Dependent_Of -> table Dependent(Employee_SSN, Name, ...) with primary key (Employee_SSN, Name).\n• Aggregation: treats an entire relationship set (plus its participating entities) as a higher-level abstract entity so that it, in turn, can participate in another relationship. Used when a relationship needs to relate to another relationship — e.g. (Employee works_on Project) as an aggregated entity that itself participates in Monitors with Manager. Without aggregation, you cannot directly connect a relationship to another relationship in the classical ER model — this is precisely the GATE-tested justification for introducing aggregation.\n• Generalization/specialization (ISA hierarchy): generalization abstracts common attributes of several entity sets into a superclass (bottom-up); specialization creates subclasses from a superclass by adding distinguishing attributes (top-down). Constraints: disjoint (an entity belongs to at most one subclass) vs overlapping (can belong to multiple), and total (every superclass entity must belong to some subclass) vs partial (need not).\n\nCARDINALITY RATIOS AND PARTICIPATION\n• Cardinality ratio for a binary relationship R between entity sets A and B: 1:1 (an A relates to at most one B and vice versa), 1:N (one A relates to many B, but each B relates to at most one A), M:N (many-to-many both ways).\n• Participation constraint: total (double line) — every entity in the set MUST participate in at least one relationship instance; partial (single line) — participation is optional.\n\nMINIMUM TABLE COUNT RULES (mapping ER to relational schema) — the complete reference table for a binary relationship R between A and B:\n• 1:1, both totally participating: 1 table possible — merge A, R, B into a single table (since each side has at most one partner and both are mandatory, a full outer join loses nothing and stays lossless). Minimum tables = 1.\n• 1:1, one side total, other partial: 2 tables minimum — merge R into the TOTAL-participation side's table (post the foreign key/attributes there, since every row on that side is guaranteed a match), keep the partial side separate. Minimum tables = 2.\n• 1:1, both partial: 2 tables minimum — merging into either side would create NULLs for entities without a partner, so keep A and B separate with a foreign key placed on either one (a nullable FK) referencing the other; R's own attributes travel with that FK. Some GATE answer keys count this as 2 tables (A and B, with the FK+relationship attributes folded into one of them) — never fewer than 2, since forcing all three into one table with a mandatory key discipline is not possible without redundancy/nulls issues on the partial side.\n• 1:N, N-side total participation towards the 1-side (i.e. every N-side entity must relate to exactly one 1-side entity): 2 tables minimum — post the 1-side's primary key as a foreign key into the N-side table along with R's attributes; the 1-side stays a separate table. Minimum tables = 2.\n• 1:N, N-side partial participation: 2 tables minimum — same FK placement (FK always goes on the 'many' side regardless of total/partial, because only the many side has a single, at-most-one partner to reference); the partial participation only affects whether that FK column can be NULL, not whether a third table is needed. Minimum tables = 2.\n• M:N, any participation (total or partial on either or both sides): 3 tables minimum always — A, B, and a separate relationship (junction) table R containing the primary keys of both A and B as a composite key (plus R's own descriptive attributes), because neither side can host a single-valued foreign key for a many-valued relationship. Minimum tables = 3, and participation totality NEVER reduces this — a common GATE trap is expecting total participation to allow merging in the M:N case; it does not, since a many-to-many association fundamentally needs its own table irrespective of mandatory participation.\n• General rule of thumb for the whole table above: merging two entity sets into one table is only sound when the relationship guarantees at most one matching row on the side being absorbed — i.e., merging is legal along the 'one' side of a 1:1 or 1:N relationship (never along an 'N' or 'M' side), and total participation on the side being merged is what lets you avoid a separate FK-bearing structure by folding attributes directly rather than nullably.\n\nWORKED EXAMPLE 1 (cardinality-to-tables)\nConsider entity sets Department(Dno, Dname) and Employee(Eno, Ename), with relationship Manages: each Department has exactly one Manager (an Employee), every Department must have a manager (total participation of Department in Manages), but an Employee need not manage any department (partial participation of Employee) and each Employee manages at most one department. This is a 1:1 relationship, Department total, Employee partial. By the rule above (one side total, one partial), the minimum number of tables is 2: fold Manages's attributes and a foreign key Manager_Eno into the Department table (since Department's participation is total, every department row is guaranteed to have a valid, non-null manager reference), and keep Employee as its own separate table. Table 1: Department(Dno, Dname, Manager_Eno) with Manager_Eno referencing Employee(Eno), NOT NULL because of total participation. Table 2: Employee(Eno, Ename).\n\nWORKED EXAMPLE 2 (weak entity + aggregation)\nA hospital database has Patient(strong, key Patient_ID), Treatment(weak entity, partial key Treatment_No, since Treatment_No numbers restart per patient) related via identifying relationship Undergoes with total participation of Treatment. Additionally, each (Patient, Treatment) pair, once it occurred, may be Billed_By exactly one Insurance_Company — this connects a relationship (Undergoes, aggregated as 'a specific treatment event') to another entity (Insurance_Company), requiring aggregation: the aggregated abstraction {Patient-Undergoes-Treatment} becomes a higher-level entity that participates in Billed_By with Insurance_Company. Resulting tables: Patient(Patient_ID, ...); Treatment(Patient_ID, Treatment_No, ..., Insurance_Company_ID) where (Patient_ID, Treatment_No) is the composite primary key (owner key + partial key per the weak-entity rule) and Insurance_Company_ID is the foreign key introduced by the aggregated Billed_By relationship; Insurance_Company(Insurance_Company_ID, ...).\n\nGATE TRAPS\n• A ternary relationship is NOT equivalent to three pairwise binary relationships — decomposing loses information about which triples of entities actually co-occurred; only convert when explicitly justified.\n• Total participation constraint is about mandatory relationship membership, NOT about whether an attribute can be NULL directly — but it does drive whether a resulting foreign key column is nullable.\n• A weak entity's discriminator (partial key) is unique only within one owner's partition, not globally — the global key of the weak entity's table is always owner-key + partial-key, never the partial key alone.\n• M:N relationships ALWAYS need a separate junction table regardless of participation constraints — do not let total participation on one or both sides tempt you into merging tables.\n• Aggregation is needed specifically when a relationship must relate to another relationship (or a relationship needs to participate in a further relationship) — not for ordinary chains of binary relationships between entities.\n• Multivalued attributes are never stored directly in the owning entity's relational table as a single column — they require a separate table keyed on (owner key, value) to preserve first normal form.";

window.GATE_DATA.questions['dbms'].topics.find(function(t){return t.id==='dbms-ra-sql';}).theory.deep = "DEEP THEORY: RELATIONAL ALGEBRA, CALCULUS AND SQL\n\nBASIC RA OPERATORS (each takes relation(s), returns a relation)\n• Selection (sigma, condition subscript): picks rows satisfying a predicate; unary; does not change arity.\n• Projection (pi, attribute-list subscript): picks columns and removes duplicate resulting rows (set semantics) — a common trap: SQL's SELECT does NOT remove duplicates by default (bag semantics) unless DISTINCT is used, so RA projection and plain SQL SELECT differ.\n• Union (R union S), Set Difference (R minus S), Cartesian Product (R x S): R and S must be UNION-COMPATIBLE for union/difference — same degree (number of attributes) and corresponding attributes drawn from the same domain. Product has no compatibility requirement and produces |R|*|S| tuples with combined arity.\n• Rename (rho): renames a relation and/or its attributes without changing content; needed to combine a relation with itself (self-join) or to disambiguate attribute names.\nDERIVED OPERATORS\n• Intersection (R intersect S = R - (R - S)): union-compatible relations only.\n• Join family: Theta-join (R join-on-theta S = sigma_theta(R x S)) keeps rows satisfying an arbitrary predicate theta; Equijoin is a theta-join restricted to equality predicates; Natural join (R join S) is an equijoin on ALL commonly-named attributes with the duplicate join column(s) automatically projected out — natural join is the ONLY join among these that removes the duplicate column, and it silently uses every same-named attribute as a join condition (a trap if two relations happen to share an unrelated attribute name); Outer joins (left/right/full) preserve unmatched tuples from one or both sides, padding missing attribute values with NULL.\n• Division (R divide S): used for 'for all' queries. Given R(X,Y) and S(Y) where Y is a common attribute set and X = attributes(R) - attributes(S), R/S returns all X-values x such that for every tuple y in S, (x,y) exists in R. Formal derivation: R/S = pi_X(R) - pi_X( (pi_X(R) x S) - R ).\n\nWORKED EXAMPLE — DIVISION\nLet Enrolled(Student, Course) = {(S1,C1),(S1,C2),(S1,C3),(S2,C1),(S2,C2),(S3,C1)} and AllCourses(Course) = {C1,C2,C3}. Compute Enrolled / AllCourses (students enrolled in EVERY course in AllCourses). Step 1: pi_Student(Enrolled) = {S1,S2,S3}. Step 2: pi_Student(Enrolled) x AllCourses = all 9 (student,course) combinations for S1,S2,S3 against C1,C2,C3. Step 3: subtract Enrolled from that product — the missing pairs are (S2,C3) and (S3,C2),(S3,C3). Step 4: project those missing pairs onto Student = {S2,S3}. Step 5: Enrolled/AllCourses = {S1,S2,S3} - {S2,S3} = {S1}. Only S1 is enrolled in all three courses — matches the intuitive check, since S1 appears with C1,C2,C3 while S2 lacks C3 and S3 lacks C2,C3.\n\nTUPLE AND DOMAIN RELATIONAL CALCULUS — SAFETY\n• Tuple relational calculus (TRC): {t | P(t)} — t ranges over tuples. Domain relational calculus (DRC): {<x1,...,xn> | P(x1,...,xn)} — variables range over domain values.\n• Both are declarative (what to retrieve) vs RA's procedural (how). Codd's theorem: safe TRC/DRC expressions are exactly as expressive as RA (relationally complete).\n• Safety: an expression is UNSAFE if it can produce an infinite relation or reference values not drawn from the domains of any relation in the expression — e.g. {t | not R(t)} is unsafe because it would include every tuple NOT in R, which is unbounded over an infinite domain. A formula is safe if every value in any tuple satisfying it appears in the 'domain' of the formula: the set of constants in the formula plus attribute values actually appearing in any relation referenced. GATE frequently asks to identify an unsafe expression involving negation without a bounding positive term.\n\nSQL EVALUATION ORDER (conceptual/logical order, not textual order)\n1. FROM (and JOINs) — build the working row set.\n2. WHERE — filter rows before grouping (cannot reference aggregate functions here — trap: WHERE cannot contain SUM()/COUNT() etc, must use a subquery instead).\n3. GROUP BY — partition remaining rows into groups.\n4. HAVING — filter groups (can use aggregate functions since groups already exist).\n5. SELECT — compute output expressions/aggregates (column aliases defined here are NOT visible to WHERE, but many engines allow them in GROUP BY/HAVING/ORDER BY).\n6. DISTINCT — eliminate duplicate output rows.\n7. ORDER BY — sort final result (may reference SELECT aliases).\n8. LIMIT/OFFSET — truncate.\n\nGROUP BY / HAVING RULES\n• Every column in SELECT that is not inside an aggregate function must appear in GROUP BY (standard SQL rule); violating this is a classic GATE-style error to spot.\n• HAVING filters on a per-group basis, evaluated after grouping/aggregation; WHERE filters individual rows before grouping — using them interchangeably where aggregates are needed is a trap.\n\nNULL AND THREE-VALUED LOGIC (TRUE / FALSE / UNKNOWN)\nAND truth table: TRUE-AND-TRUE=TRUE, TRUE-AND-FALSE=FALSE, TRUE-AND-UNKNOWN=UNKNOWN, FALSE-AND-anything=FALSE, UNKNOWN-AND-UNKNOWN=UNKNOWN.\nOR truth table: TRUE-OR-anything=TRUE, FALSE-OR-FALSE=FALSE, FALSE-OR-UNKNOWN=UNKNOWN, UNKNOWN-OR-UNKNOWN=UNKNOWN.\nNOT truth table: NOT TRUE=FALSE, NOT FALSE=TRUE, NOT UNKNOWN=UNKNOWN.\n• A WHERE/HAVING clause only keeps rows where the condition evaluates to TRUE — rows evaluating to UNKNOWN (e.g. from comparisons involving NULL, since NULL = anything and NULL <> anything both yield UNKNOWN) are excluded, just like FALSE rows — a major GATE trap, e.g. 'WHERE salary <> NULL' never matches anything; the correct form is 'WHERE salary IS NOT NULL'.\n• Aggregate functions (except COUNT(*)) ignore NULLs in their column; COUNT(*) counts all rows including those with NULLs, COUNT(column) counts only non-NULL values of that column.\n\nSUBQUERIES\n• Uncorrelated subquery: evaluated once, independent of the outer query's current row; can conceptually be computed first and then plugged in.\n• Correlated subquery: references a column from the outer query, so it is logically re-evaluated once per outer row — semantically like a nested loop.\n• IN: outer value matches ANY value in subquery's result set — NULL in the subquery result set combined with a non-matching outer value can turn a NOT IN into UNKNOWN for that row, silently dropping rows (classic trap: 'WHERE x NOT IN (subquery containing NULL)' can return an empty result even when logically rows should match, because comparing to a NULL in the list gives UNKNOWN, and OR-ing UNKNOWN with FALSE never becomes TRUE, so the whole NOT IN evaluates to UNKNOWN/FALSE for every row).\n• EXISTS: TRUE if the correlated subquery returns at least one row (ignores actual column values); NOT EXISTS is the standard, NULL-safe way to express universal/'for all' conditions, unlike NOT IN.\n• ANY/SOME: TRUE if the comparison holds for at least one row returned (e.g. '> ANY' means greater than at least one, i.e. greater than the minimum). ALL: TRUE if the comparison holds for every row returned (e.g. '> ALL' means greater than the maximum). '= ANY' is equivalent to IN; '<> ALL' is equivalent to NOT IN (with the same NULL pitfalls).\n\nWORKED EXAMPLE — QUERY OUTPUT ON A SMALL TABLE\nTable Emp(Eid, Dept, Salary): (1,'CS',50000), (2,'CS',60000), (3,'EE',55000), (4,'EE',NULL), (5,'CS',NULL).\nQuery: SELECT Dept, COUNT(*) AS Cnt, COUNT(Salary) AS SalCnt, AVG(Salary) AS AvgSal FROM Emp GROUP BY Dept HAVING COUNT(*) > 2;\nEvaluation: FROM gives all 5 rows; WHERE absent; GROUP BY Dept forms groups CS={1,2,5} (3 rows) and EE={3,4} (2 rows); HAVING COUNT(*)>2 keeps only CS (3>2 true) and drops EE (2>2 false). For CS: COUNT(*)=3 (all rows counted), COUNT(Salary)=2 (NULL from row 5 excluded), AVG(Salary) = (50000+60000)/2 = 55000 (NULL excluded from average, not treated as 0). Final output: exactly one row -> Dept='CS', Cnt=3, SalCnt=2, AvgSal=55000.\n\nGATE TRAPS\n• Natural join auto-joins on ALL identically named columns — verify no accidental shared column names before assuming behavior.\n• Division has no direct single SQL operator; it must be expressed via double negation (NOT EXISTS ... NOT EXISTS) or GROUP BY/HAVING COUNT DISTINCT tricks.\n• NOT IN with a NULL-containing subquery silently yields no rows — always prefer NOT EXISTS for 'not in / for all' logic.\n• WHERE cannot filter on aggregate results; must use HAVING, or a derived-table/subquery wrapping the aggregate.\n• RA projection removes duplicates (set semantics); plain SQL SELECT does not (bag semantics) unless DISTINCT is specified — do not assume the two always give equal cardinality.\n• Unsafe calculus expressions (unbounded negation) are not directly translatable to RA — always check the domain is bounded by some positive occurrence.";

window.GATE_DATA.questions['dbms'].topics.find(function(t){return t.id==='dbms-normalization';}).theory.deep = "DEEP THEORY: FUNCTIONAL DEPENDENCIES AND NORMALIZATION\n\nFUNCTIONAL DEPENDENCY (FD) BASICS\n• X -> Y holds on relation R if whenever two tuples agree on all attributes of X, they must also agree on all attributes of Y. X is the determinant, Y the dependent.\n• Trivial FD: X -> Y where Y is a subset of X (always holds, gives no information). Non-trivial: Y is not a subset of X.\n\nARMSTRONG'S AXIOMS (sound and complete for FD inference)\n• Reflexivity: if Y subset-of X, then X -> Y (trivial FDs).\n• Augmentation: if X -> Y, then XZ -> YZ for any Z.\n• Transitivity: if X -> Y and Y -> Z, then X -> Z.\nDERIVED RULES (provable from the three axioms, all frequently used directly)\n• Union: if X -> Y and X -> Z, then X -> YZ.\n• Decomposition: if X -> YZ, then X -> Y and X -> Z.\n• Pseudotransitivity: if X -> Y and WY -> Z, then WX -> Z.\n\nATTRIBUTE CLOSURE ALGORITHM (X+)\nAlgorithm: start result = X. Repeat: for each FD A -> B in the FD set, if A is a subset of result, add B to result. Stop when no more attributes can be added (fixed point). X determines all of R's attributes iff X+ = all attributes of R (then X is a superkey).\nWORKED EXAMPLE: R(A,B,C,D,E) with FDs: A->B, B->C, A,D->E, C->A. Find (A,D)+.\nStart: result = {A,D}. Apply A->B: B is new -> result={A,B,D}. Apply B->C: C is new -> result={A,B,C,D}. Apply C->A: A already present, no change. Apply A,D->E: A and D both in result -> add E -> result={A,B,C,D,E}. No more FDs apply, all 5 attributes reached, so (A,D)+ = {A,B,C,D,E} = all attributes of R, meaning AD is a superkey of R. Since removing either A or D breaks the chain (D alone: D+ ={D}, cannot fire any FD since none has D alone as LHS subset match except AD->E which needs A too; A alone: A+ = {A,B,C} via A->B->C->A, missing D and E), AD is minimal, so AD is a CANDIDATE KEY.\n\nCANDIDATE KEY FINDING RECIPE (must/cannot appear analysis)\n• Attributes that never appear on the right-hand side of ANY FD, and do not appear in any FD at all as a dependent, MUST be part of every candidate key (they can never be derived from anything else) — call this set the 'core' attributes.\n• Attributes that never appear on the LEFT-hand side of any FD (pure dependents only) CANNOT be part of any candidate key (adding them to a determinant set never helps derive new attributes) — exclude these from candidate-key search entirely.\n• Compute the closure of the mandatory core attributes first: if that closure already equals all of R's attributes, the core itself is the unique candidate key. Otherwise, augment the core with combinations of the remaining 'maybe' attributes (those appearing on both sides of some FDs), test each minimal combination's closure, and keep only minimal supersets whose closure is all of R.\n\nNORMAL FORM DEFINITIONS (precise)\n• 1NF: every attribute value is atomic (no repeating groups/multivalued or composite attributes within a single column).\n• 2NF: R is in 1NF, AND every non-prime attribute (an attribute not part of ANY candidate key) is fully functionally dependent on every candidate key — i.e., no non-prime attribute depends on a PROPER SUBSET of any candidate key (no partial dependency). Partial dependency can only exist when a candidate key is composite; if all candidate keys are single attributes, 2NF is automatically satisfied whenever 1NF holds.\n• 3NF: R is in 1NF, AND for every non-trivial FD X -> A holding on R, EITHER X is a superkey, OR A is a prime attribute (a member of SOME candidate key). This is the precise 'no transitive dependency' rule but stated to explicitly ALLOW A to be prime even if X is not a superkey — a key nuance GATE tests: 3NF tolerates a non-superkey determinant if the dependent attribute is prime, which BCNF does not tolerate.\n• BCNF: R is in 1NF, AND for every non-trivial FD X -> A holding on R, X MUST be a superkey — no exception for prime attributes. BCNF is strictly stronger than (or equal to) 3NF; every BCNF relation is in 3NF but not vice versa.\n• 4NF (brief): additionally, every non-trivial multivalued dependency X ->> Y must have X as a superkey (deals with independent multivalued facts causing redundancy beyond what FDs capture).\n\nDECOMPOSITION PROPERTIES\n• Lossless-join (non-additive) decomposition test for a BINARY decomposition of R into R1 and R2: it is lossless iff (attributes(R1) intersect attributes(R2)) -> attributes(R1) is in the FD closure, OR (attributes(R1) intersect attributes(R2)) -> attributes(R2) is in the FD closure — i.e., the common attribute set must be a superkey (determinant that fully determines) of AT LEAST ONE of the two pieces. If neither holds, rejoining R1 and R2 via natural join can produce spurious extra tuples not in the original relation.\n• Dependency preservation: a decomposition preserves dependencies if the union of the projected FD sets on each Ri (their closures) implies every FD in the original FD set, i.e., all original FDs can be checked without needing to join pieces back together. This is checked by computing (F1 union F2 union ...)+ and confirming it equals F+.\n• 'BCNF may lose dependency preservation, 3NF synthesis NEVER loses dependency preservation.' This is because the 3NF synthesis algorithm builds one relation per FD in a minimal cover directly, guaranteeing each FD is preserved within some resulting relation, whereas achieving BCNF sometimes forces splitting a relation in a way that no single resulting relation retains all attributes of some original FD's determinant and dependent together, so that FD can only be verified by an expensive join across pieces. Both algorithms (3NF synthesis and BCNF decomposition) always guarantee losslessness; only dependency preservation can fail, and it fails specifically for BCNF, never for the standard 3NF synthesis algorithm.\n\nMINIMAL COVER (canonical cover) ALGORITHM\nGiven FD set F, produce an equivalent minimal set Fmin such that: every FD has a single attribute on the right-hand side (RHS); no FD has an extraneous attribute on its LHS (removing any LHS attribute changes the closure, i.e. no smaller LHS gives the same closure); and no FD itself is redundant (removing it doesn't change F+). Steps: (1) Decompose all RHS to singleton attributes using the decomposition rule. (2) For each FD, try removing each LHS attribute one at a time and recompute the closure using the (temporarily reduced) FD; if the closure using the reduced LHS still lets you derive the same RHS attribute via the whole set, the removed attribute was extraneous — drop it permanently. (3) For each remaining FD, temporarily remove it entirely from the set and check (using the rest) whether its LHS's closure still includes its RHS; if yes, the FD is redundant and can be dropped permanently. Repeat until no more simplification is possible.\n\nWORKED EXAMPLE — MINIMAL COVER + 2NF/3NF CHECK\nR(A,B,C) with FDs: AB -> C, C -> B. Candidate keys: core attribute analysis — A appears only on LHS (never as RHS) so A is mandatory in every key; C appears on both sides; B appears only as RHS of C->B and as part of LHS of AB->C. Test AC: AC+ : start {A,C}; C->B fires (B added) -> {A,B,C}; AB->C already have C. AC+ = {A,B,C} = all attributes, so AC is a superkey; check minimality: A+ = {A} (no FD with just A as LHS-subset match), C+ = {B,C} via C->B (missing A), so neither A nor C alone works — AC is a CANDIDATE KEY (minimal). Is there another? AB+: {A,B} -> AB->C fires -> {A,B,C} = all, so AB is also a superkey; is it minimal — A+={A}, B+={B}; yes AB is also a candidate key. So candidate keys are {AC, AB}; prime attributes = {A,B,C} (all three appear in some key) — every attribute is prime here. Now check normal forms: 2NF — non-prime attributes: none (A,B,C are all prime), so 2NF holds trivially (2NF only restricts non-prime attributes). 3NF — check each FD: AB->C: AB is a superkey, condition satisfied. C->B: C is NOT a superkey (C+ = {B,C}, missing A), so we need B to be prime — B IS prime (member of key AB) — condition satisfied via the prime-attribute exception. So R is in 3NF. BCNF check: C->B requires C to be a superkey, but C is not a superkey (C+ != all attributes) — BCNF is VIOLATED. This exactly demonstrates the 3NF-allows-prime-exception vs BCNF-does-not distinction: R is in 3NF but not in BCNF.\n\nGATE TRAPS\n• 2NF partial dependency can only occur relative to a COMPOSITE candidate key — if every candidate key is a single attribute, the relation is automatically in 2NF whenever it is in 1NF; do not hunt for partial dependencies with singleton keys.\n• 3NF's exception clause requires the DEPENDENT attribute A to be prime, not the determinant X to be prime — a common misreading.\n• A relation can be in 3NF but violate BCNF only when there exists an FD whose LHS is not a superkey but whose RHS happens to be prime; verify prime-ness by checking membership across ALL candidate keys, not just the primary key chosen by the designer.\n• Lossless-join must be checked using the common-attribute-determines-one-side rule; simply having a common attribute between two projected relations is not sufficient by itself.\n• Dependency preservation and lossless-join are independent properties — a decomposition can achieve one without the other, and BOTH properties together are not always simultaneously achievable when full BCNF is mandatory.\n• When computing attribute closures for candidate-key hunting, always start by isolating attributes that never appear as any FD's RHS — skipping this step wastes significant time testing unnecessary attribute subsets on the exam.";

window.GATE_DATA.questions['dbms'].topics.find(function(t){return t.id==='dbms-indexing';}).theory.deep = "DEEP THEORY: FILE ORGANIZATION AND INDEXING\n\nFILE ORGANIZATIONS\n• Heap (unordered) file: records inserted wherever space is available; fast insertion (O(1) amortized, just append), but search requires a full linear scan O(n) blocks in the worst case.\n• Sequential (ordered) file: records physically sorted by some search key; supports binary search O(log2(n)) block accesses for exact-match/range queries on that key, but insertion/deletion requires shifting records or maintaining overflow areas, making updates expensive.\n• Hashing file: a hash function maps a search key directly to a bucket/block address; gives near O(1) average access for exact-match queries on the hash key, but is poor for range queries since hashing destroys ordering.\n\nDENSE VS SPARSE INDEXES\n• Dense index: contains one index entry for EVERY search-key value (equivalently, every record if the key is not unique per value) in the data file, each entry pointing directly to the record (or first record with that value). Works on both sorted and unsorted data files.\n• Sparse index: contains index entries for only SOME search-key values, typically one entry per BLOCK of the data file (pointing to the first record of that block); requires the data file to be physically sorted on the index's search key, since locating a non-indexed value requires scanning forward from the nearest preceding sparse entry. Sparse indexes are smaller (fewer entries, less storage, fewer levels if multi-level) but every search needs one extra sequential scan step within the target block.\n\nPRIMARY / CLUSTERING / SECONDARY INDEX DEFINITIONS TABLE\n• Primary index: an ordered index defined on the search key that is ALSO the ordering key of a data file that is sorted AND has a unique value per index entry (search key = primary key of a sequentially ordered file). Can be dense or sparse; because it corresponds to a unique key, sparse is common (one entry per block suffices, since within a block a simple scan for the exact match works after landing at the block start).\n• Clustering index: an ordered index defined on a NON-key field on which the data file IS physically sorted, but the field is NOT unique (many records share a value). Only ONE clustering (or primary) index is possible per data file, because the file can only be physically sorted in one order at a time. Typically sparse — one entry per distinct search-key value block group, since all records with the same value are stored contiguously.\n• Secondary index: an index (dense, always) on a field that is NOT the physical sort order of the data file — the data file may be sorted on a completely different field, or on none at all. Since records with the search-key value can be scattered anywhere in the file, a secondary index MUST be dense (one entry per record) — sparse is not possible because there is no contiguous block to land in and scan; you need a direct pointer to each and every qualifying record. Multiple secondary indexes can coexist on the same file.\n• Summary of the key comparative facts (heavily tested): at most one primary/clustering index per file (both require physical sort order, and a file has only one physical order) but arbitrarily many secondary indexes; primary/clustering indexes can be sparse, secondary indexes must always be dense.\n\nB-TREE VS B+-TREE STRUCTURAL DIFFERENCES\n• B-tree: search-key values and their associated data pointers can appear in INTERNAL (non-leaf) nodes as well as leaf nodes — each key value is stored exactly once anywhere in the tree, together with its record pointer, wherever it happens to land during insertion/splits. Range queries are less efficient because leaf nodes are not linked and an in-order traversal must repeatedly move up and down the tree.\n• B+-tree: ALL actual data-record pointers exist ONLY at the leaf level; internal nodes store ONLY search-key values used purely for routing/navigation (copies of keys, no data pointers) — a key value that also routes internally is duplicated at internal levels. Leaf nodes are additionally linked together in a sequential chain (typically singly or doubly linked list) enabling fast, efficient range/sequential scans by simply following leaf pointers without revisiting internal nodes. Because internal nodes hold only keys (no data pointers), they can pack more keys per node than a B-tree's internal nodes of the same block size, giving a B+-tree a higher fan-out and hence fewer levels for the same number of records — this is why B+-trees are used almost universally in real database indexes over plain B-trees.\n\nB+-TREE ORDER FORMULAS (with pointer/key inequality derivation)\nLet a block/node of size (capacity) hold at most 'p' tree pointers and the associated keys. Define order 'n' as the maximum number of tree pointers a node can hold.\n• INTERNAL NODE structure: an internal node of order n has at most n tree pointers and at most (n-1) search-key values (since between n pointers there are exactly n-1 'gaps' for separator keys, pointer-key-pointer-key-...-pointer). Space constraint: n*(pointer size) + (n-1)*(key size) <= block size. Solve for n: n <= (block size + key size) / (pointer size + key size), then take the floor.\n• LEAF NODE structure: a leaf node holds at most (n-1) search-key values, each paired with ONE record pointer (data pointer) of its own, PLUS one extra 'next-leaf' block pointer at the end for the linked-list chaining. So a leaf holds up to (n-1) (key, record-pointer) pairs plus 1 block pointer for chaining. Space constraint: (n-1)*(key size + record-pointer size) + (block pointer size) <= block size. Solve for n: n <= (block size - block pointer size + key size) / (key size + record pointer size), floor the result. (If record-pointer size equals block-pointer size, this simplifies further, but always substitute the actual given sizes.)\n• Minimum occupancy (for a B+-tree of order n, ignoring the root which has a looser minimum of 2 pointers): every non-root internal node must have at least ceil(n/2) pointers (hence at least ceil(n/2)-1 keys); every non-root leaf must be at least half full, i.e. at least floor((n-1)/2) or ceil((n-1)/2) key-pointer pairs depending on the exact textbook convention used (Silberschatz uses ceil((n-1)/2) for leaves) — GATE questions typically state the convention explicitly or only ask for the maximum-order computation, but be alert to which convention a given question follows.\n\nWORKED EXAMPLE — ORDER COMPUTATION\nBlock size = 1024 bytes, key size = 14 bytes, block/tree-pointer size = 8 bytes, record pointer size = 8 bytes (same as block pointer here). Compute the order of internal and leaf nodes.\nInternal node: n <= (1024 + 14) / (8 + 14) = 1038 / 22 = 47.18 -> floor -> n = 47. So an internal node can have at most 47 pointers and 46 keys, check: 47*8 + 46*14 = 376 + 644 = 1020 <= 1024, correct (n=48 would need 48*8+47*14=384+658=1042 > 1024, confirming 47 is the max).\nLeaf node: n <= (1024 - 8 + 14) / (14 + 8) = 1030 / 22 = 46.8 -> floor -> n = 46. So a leaf can hold at most 45 (key, record-pointer) pairs plus 1 chaining pointer, check: 45*(14+8) + 8 = 45*22 + 8 = 990+8 = 998 <= 1024, and n=47 would need 46*22+8 = 1012+8=1020 which still fits <=1024 — so recheck arithmetic carefully: using the formula n <= (1024-8+14)/22 = 1030/22 = 46.8, floor gives n=46, meaning at most (n-1)=45 pairs; always verify by plugging the floor value and the next integer back into the raw inequality as shown, since off-by-one errors here are the single most common GATE mistake on this topic.\n\nINSERTION SPLIT BEHAVIOR\n• Inserting into a leaf that has room: simply insert the (key, pointer) pair in sorted position.\n• Leaf overflow (leaf already has n-1 pairs, would exceed capacity): split the leaf into two leaves, distributing the (n) pairs (old n-1 plus the new one) so that the left leaf keeps ceil(n/2) entries and the right keeps the remainder (convention varies slightly by textbook but ceil/floor split is standard); COPY UP the smallest search-key value of the new right leaf into the parent as a separator (the key is duplicated — it still physically remains in the right leaf too, unlike internal-node splits).\n• Internal node overflow (would exceed n pointers after inserting a new separator/pointer pair from a child split): split into two internal nodes, and PUSH UP (not copy) the middle key into the parent — this middle key is REMOVED from both resulting children, since internal nodes never store data, only routing keys. This copy-up-at-leaf vs push-up-at-internal distinction is a frequently tested subtlety.\n• If the root itself splits, a new root is created above it, increasing the tree's height by exactly one level — this is the only way a B+-tree grows taller, and it keeps the tree perfectly height-balanced (all leaves remain at the same depth) by construction.\n\nBLOCK ACCESS COUNTING\n• For a B+-tree of height h (number of levels from root to leaf, i.e., h internal levels traversed plus 1 leaf access, often quoted as h+1 total disk accesses where h = number of non-leaf levels), an exact-match search costs h+1 block accesses: one per internal level down to find the correct leaf, plus one to read the leaf itself (and possibly one more to fetch the actual data record if the leaf stores only a pointer rather than the record itself, i.e., a secondary/non-clustering index situation).\n• A range query additionally costs one extra block access per subsequent leaf block scanned via the leaf-chain linked list, plus one access per qualifying record if records must be fetched individually (further block accesses if those records are scattered rather than clustered).\n• Height h for N records with leaf order n_leaf and internal order n_internal is approximately h = ceil(log_{ceil(n_internal/2)}(N / (n_leaf/2))) — GATE typically gives concrete numbers and expects you to divide down repeatedly using minimum (half-full) or maximum fan-out per level as specified by the question, rather than expecting the general log formula memorized verbatim.\n\nGATE TRAPS\n• Do not confuse 'order' definitions across sources — some define order as max KEYS per node, others (Silberschatz, most common in GATE) as max POINTERS per node; always re-derive the pointer/key inequality from the block-size constraint given in the question rather than assuming a memorized numeric order applies.\n• A clustering index requires the file to be sorted on a NON-key (repeating) attribute — confusing this with a primary index (which requires a unique/key attribute) is a frequent error.\n• Only ONE index per file can be primary or clustering (they both require a specific physical sort order) — but this does not limit the number of secondary indexes, which impose no physical ordering requirement.\n• Secondary indexes are always dense — never assume a sparse secondary index is possible.\n• At leaf-split time the separator key is COPIED UP (remains in the leaf); at internal-node-split time the middle key is PUSHED UP and removed from the children — swapping these two behaviors is the most common insertion-mechanics mistake.\n• Always double check floor/ceiling and off-by-one in the pointer/key inequality by re-substituting the computed n (and n+1) back into the raw size inequality, since the algebraic formula alone is a common source of small arithmetic slips under exam time pressure.";

window.GATE_DATA.questions['dbms'].topics.find(function(t){return t.id==='dbms-transactions';}).theory.deep = "DEEP THEORY: TRANSACTIONS, CONCURRENCY CONTROL AND RECOVERY\n\nACID PROPERTIES\n• Atomicity: a transaction executes fully (commit) or not at all (abort/rollback) — no partial effects persist; enforced by the recovery manager using logs.\n• Consistency: a transaction takes the database from one consistent state to another, preserving all declared integrity constraints — a joint responsibility of the application/schema design and the DBMS's constraint checking.\n• Isolation: concurrently executing transactions must not observe each other's intermediate (uncommitted) states, as if they ran serially — enforced by the concurrency control manager (locking, timestamping, etc).\n• Durability: once a transaction commits, its effects survive subsequent failures (crashes) — enforced by write-ahead logging and stable storage.\n\nANOMALY CATALOGUE (caused by unrestricted concurrent execution)\n• Dirty read (WR conflict visible): a transaction reads a value written by another transaction that has NOT yet committed (and might later abort), so the reader may act on data that never truly existed in a valid database state.\n• Lost update (WW conflict): two transactions both read the same item, then both write back updated values based on their stale reads, and one transaction's update overwrites (erases) the other's, losing one of the updates entirely.\n• Unrepeatable (non-repeatable) read (RW conflict from reader's perspective): a transaction reads the same item twice and gets two different values because another transaction updated and committed the item in between the two reads.\n• Phantom read: a transaction re-executes a range query and finds NEW rows that satisfy the condition, inserted by another committed transaction in between — distinct from unrepeatable read because it involves a changing ROW SET (inserts/deletes) rather than a changing value of an already-read row.\n\nCONFLICT PAIRS (used to build precedence/serializability graphs)\n• Two operations from DIFFERENT transactions CONFLICT if: they access the SAME data item, AND at least one of them is a WRITE. The three conflicting pairs: Write-Read (WR), Read-Write (RW), Write-Write (WW). Read-Read (RR) never conflicts, since reads do not change any value and can be freely reordered.\n\nPRECEDENCE GRAPH ALGORITHM (for CONFLICT serializability)\nAlgorithm: create one node per transaction. For every pair of conflicting operations Oi (from Ti) and Oj (from Tj) where Oi occurs before Oj in the schedule (i != j), draw a directed edge Ti -> Tj. After processing the entire schedule, the schedule is CONFLICT SERIALIZABLE if and only if the resulting precedence graph is ACYCLIC; if acyclic, ANY topological sort of the graph gives a valid equivalent serial order.\n\nWORKED EXAMPLE — PRECEDENCE GRAPH\nSchedule S: T1:R(A); T2:W(A); T1:W(A); T2:R(B); T3:W(B); T1:R(B).\nIdentify conflicts in order of occurrence: (1) T1:R(A) before T2:W(A) on item A, RW conflict -> edge T1 -> T2. (2) T2:W(A) before T1:W(A) on item A, WW conflict -> edge T2 -> T1. (3) T1:W(A) — no later conflicting op on A. (4) T2:R(B) before T3:W(B) on item B, RW conflict -> edge T2 -> T3. (5) T3:W(B) before T1:R(B) on item B, WR conflict -> edge T3 -> T1. Compiled edges: T1->T2, T2->T1, T2->T3, T3->T1. Since we have both T1->T2 and T2->T1, there is a 2-cycle (T1,T2) immediately — the graph is CYCLIC, so schedule S is NOT conflict serializable.\n\nVIEW SERIALIZABILITY\nTwo schedules S1 and S2 (over the same set of transactions) are VIEW EQUIVALENT if all three hold: (1) Initial reads match: if Ti reads the initial value of item X in S1, Ti must also read the initial value of X in S2. (2) Read-from relationships match: if Ti reads X from a write by Tj in S1, the same must hold in S2 (Ti reads X written by that same Tj) in S2. (3) Final writes match: if Ti performs the FINAL write on item X in S1, Ti must also perform the final write on X in S2. A schedule is VIEW SERIALIZABLE if it is view-equivalent to some serial schedule. Every conflict-serializable schedule is also view-serializable, but NOT vice versa — view serializability is strictly weaker (more permissive); the extra schedules captured only by view (not conflict) serializability necessarily contain BLIND WRITES (a write not preceded by a read of the same item by the same transaction). Testing general view serializability is NP-complete, unlike testing conflict serializability, which is polynomial (just build and check the precedence graph) — a fact GATE likes to test directly.\n\nRECOVERABILITY HIERARCHY (strictly increasing restrictiveness)\n• Recoverable schedule: if Tj reads an item written by Ti, then Ti must COMMIT before Tj commits. This is the minimum requirement to guarantee that aborting Ti can be handled without permanently corrupting a committed Tj.\n• Cascadeless (Avoids Cascading Aborts, ACA) schedule: a stronger condition — Tj may read an item written by Ti ONLY AFTER Ti has already COMMITTED (not merely before Tj itself commits, but before Tj even performs the read). This prevents a chain reaction where aborting Ti would force Tj, which read Ti's uncommitted write, to also abort, potentially cascading further to transactions that read from Tj, etc.\n• Strict schedule: strongest of the three — a transaction may neither READ NOR WRITE an item written by another transaction until that other transaction COMMITS or ABORTS. Strict schedules simplify recovery to simple 'restore before-image on abort' with no cascading concerns at all, and every strict schedule is cascadeless, and every cascadeless schedule is recoverable — the hierarchy is Strict subset-of Cascadeless subset-of Recoverable subset-of (all schedules).\n\nTWO-PHASE LOCKING (2PL) VARIANTS TABLE\n• Basic 2PL: every transaction has a growing phase (only acquires/upgrades locks, never releases) followed strictly by a shrinking phase (only releases/downgrades locks, never acquires more) — guarantees CONFLICT SERIALIZABILITY, but does NOT by itself prevent cascading aborts (a transaction could release a lock on X right after its last access to X, well before it commits, allowing another transaction to read that dirty value) and does not prevent deadlock.\n• Conservative (static) 2PL: a transaction must acquire ALL the locks it will EVER need before it begins execution (predeclaration); if any lock is unavailable, it acquires none and waits. This variant PREVENTS DEADLOCK (since a transaction never holds some locks while waiting for others held by a transaction that is itself waiting on it) but is impractical since the full read/write set must be known in advance, reducing concurrency.\n• Strict 2PL: all EXCLUSIVE (write) locks held by a transaction are released only AFTER it commits or aborts (shared/read locks can still be released earlier per basic 2PL rules in some definitions, though many treat all locks as held till commit). Prevents other transactions from reading OR overwriting uncommitted writes, thus guaranteeing the schedule is CASCADELESS in addition to conflict-serializable. Widely used in real systems as the practical default.\n• Rigorous 2PL: ALL locks (both shared and exclusive) are held until the transaction commits or aborts — this is the strongest variant, and it guarantees the schedule is STRICT (satisfying the strongest recoverability property directly), and additionally guarantees that the commit order of transactions matches their conflict-serializability order (i.e., the equivalent serial order is exactly the transactions' commit order), which strict 2PL alone does not always guarantee.\n\nTIMESTAMP ORDERING (TO) PROTOCOL RULES\n• Every transaction Ti is assigned a unique timestamp TS(Ti) at start, typically using system clock or a logical counter; the protocol enforces that the effect of the schedule is equivalent to the serial order defined by these timestamps.\n• Each data item Q maintains W-timestamp(Q) (largest timestamp of any transaction that successfully wrote Q) and R-timestamp(Q) (largest timestamp of any transaction that successfully read Q).\n• READ rule: if TS(Ti) < W-timestamp(Q), reject and roll back Ti (Ti is trying to read a value that was already overwritten by a 'future' transaction, violating timestamp order); otherwise allow the read and set R-timestamp(Q) = max(R-timestamp(Q), TS(Ti)).\n• WRITE rule (basic TO): if TS(Ti) < R-timestamp(Q) OR TS(Ti) < W-timestamp(Q), reject and roll back Ti (an older transaction attempting to write after a younger transaction has already read or written the item would violate the required order); otherwise perform the write and set W-timestamp(Q) = TS(Ti).\n• THOMAS WRITE RULE (an optimization/modification of the basic TO write rule): if TS(Ti) < R-timestamp(Q), still reject and roll back Ti (unchanged — cannot violate a read that already happened). BUT if TS(Ti) < W-timestamp(Q) is the ONLY violated condition (i.e., R-timestamp(Q) check passes), instead of rolling back, simply IGNORE (skip) Ti's write entirely and let Ti continue as if the write happened — because a later transaction has already overwritten Q with a newer value, Ti's write would immediately have been overwritten anyway, so it is safe to discard it rather than aborting the transaction. This is called a 'dead' or obsolete write. Thomas write rule allows some schedules that are NOT conflict-serializable but ARE still correct (view-serializable), increasing concurrency compared to basic TO.\n• Timestamp ordering is inherently DEADLOCK-FREE (transactions are rolled back/restarted rather than made to wait indefinitely in a cycle), unlike lock-based protocols.\n\nDEADLOCK HANDLING — PREVENTION SCHEMES USING TIMESTAMPS\n• Wait-Die (non-preemptive, older transaction waits): when Ti requests a lock held by Tj: if TS(Ti) < TS(Tj) (Ti is OLDER than Tj), Ti is allowed to WAIT for Tj. If TS(Ti) > TS(Tj) (Ti is YOUNGER), Ti DIES (is rolled back and restarted, later, with its ORIGINAL timestamp preserved so it eventually becomes old enough to proceed). Mnemonic: 'older waits, younger dies.'\n• Wound-Wait (preemptive, older transaction wounds/aborts the younger): when Ti requests a lock held by Tj: if TS(Ti) < TS(Tj) (Ti is OLDER), Ti WOUNDS Tj — Tj is forced to abort/roll back and release its locks (unless Tj already committed) — and Ti takes the lock (or waits only briefly for the rollback to complete). If TS(Ti) > TS(Tj) (Ti is YOUNGER), Ti simply WAITS for Tj to finish normally. Mnemonic: 'older wounds younger, younger waits.'\n• Both schemes guarantee no deadlock because they enforce a strict, non-cyclic priority ordering based on timestamps (a transaction only ever waits for an older or younger transaction consistently in a way that prevents circular wait), and both restart aborted transactions with their ORIGINAL timestamp to guarantee eventual progress (no starvation) — a transaction restarted enough times will eventually become the oldest and stop being preempted/killed.\n\nWORKED EXAMPLE — RECOVERABILITY CLASSIFICATION\nSchedule: T1:W(A); T2:R(A); T2:W(B); T1:Commit; T2:Commit. Is this recoverable? Cascadeless? Strict? T2 reads A after T1 wrote it but before T1 has committed — check recoverable: T1 commits BEFORE T2 commits (T1:Commit appears before T2:Commit in the schedule) — so the recoverability condition (writer commits before reader commits) IS satisfied — the schedule IS recoverable. Check cascadeless: the cascadeless condition requires T1 to commit BEFORE T2 even READS A — but here T2:R(A) happens BEFORE T1:Commit — this VIOLATES cascadelessness (if T1 had aborted instead of committing, T2 would have to cascade-abort too, since T2 already read T1's uncommitted value). So this schedule is recoverable but NOT cascadeless, and therefore also not strict (since strict implies cascadeless).\n\nGATE TRAPS\n• Recoverable only requires the writer to commit before the READER commits, not before the reader even reads — do not confuse this weaker condition with cascadelessness.\n• Conflict serializability is checked via an ACYCLIC precedence graph in POLYNOMIAL time; view serializability is a strictly weaker/more-permissive condition and is NP-complete to test in general — never assume the same algorithm (precedence graph) tests view serializability.\n• Basic 2PL guarantees serializability but NOT freedom from cascading aborts or deadlock; only strict/rigorous variants add cascadelessness/strictness, and only conservative 2PL adds deadlock freedom (at the cost of requiring advance lock declaration).\n• Thomas write rule modifies ONLY the write-write violation case (ignoring obsolete writes); it does NOT relax the read-based rollback condition (TS(Ti) < R-timestamp(Q) still forces rollback).\n• In Wait-Die, the OLDER transaction is the one that waits (not the one that dies) — the mnemonic ordering is easy to invert under exam pressure; double-check by remembering it symmetrically with Wound-Wait, where the OLDER transaction acts (wounds) rather than waiting.\n• A cycle of length 2 in a precedence graph (Ti->Tj and Tj->Ti) is sufficient by itself to prove non-serializability — do not keep searching for a longer cycle once any cycle is found.";

window.GATE_DATA.questions['dbms'].topics.find(function(t){return t.id==='dbms-er';}).questions.push(
{
  id: 'dbms-er-x1',
  q: "Employee(Eno) and ParkingSlot(SlotNo) are related by Assigned: every employee is assigned exactly one parking slot (Employee participates totally), but some parking slots remain unassigned (ParkingSlot participates partially), and each slot goes to at most one employee. What is the minimum number of tables needed, without introducing an avoidable NULL foreign key?",
  options: [
    'Three tables: Employee, ParkingSlot, and a separate Assigned table',
    'Two tables, merging Assigned into ParkingSlot with a nullable Employee foreign key',
    'Two tables, merging Assigned into Employee with a NOT NULL SlotNo foreign key, keeping ParkingSlot separate',
    'One table combining Employee and ParkingSlot into a single relation'
  ],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "For a 1:1 relationship where exactly one side participates totally, the relationship should be folded into the totally-participating side's table, because every row on that side is guaranteed a matching partner and the resulting foreign key can safely be declared NOT NULL. Here Employee participates totally (every employee has a slot) while ParkingSlot participates partially (some slots are unassigned), so the correct merge is Employee(Eno, SlotNo) with SlotNo NOT NULL referencing ParkingSlot(SlotNo), and ParkingSlot(SlotNo, ...) kept separate: two tables total. Merging the other way, into ParkingSlot, would force a nullable Employee column for every unassigned slot, which is legal but not minimal-NULL and not what the total-participation side dictates. A separate three-table design wastes a table since 1:1 relationships never require their own junction table, and a single merged table would force NULLs into whichever side's exclusive columns don't apply to an unassigned slot."
},
{
  id: 'dbms-er-x2',
  q: "Manager(Mid) and Project(Pid) are related by a 1:N relationship Supervises: each project has exactly one supervising manager (Project participates totally), while a manager may supervise zero or more projects. Where should the foreign key be placed, and how many tables are minimum?",
  options: [
    'Foreign key Mid is placed in the Project table; 2 tables total',
    'Foreign key Pid is placed in the Manager table as a repeating column; 2 tables total',
    'A separate junction table is mandatory here, giving 3 tables',
    'Foreign key Mid goes in Project only because Project is total; if Project were partial, a third table would be required instead'
  ],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "For any 1:N relationship the foreign key always goes on the 'many' side, because only the many side has at most one partner on the other side to reference with a single-valued column; this placement rule holds regardless of whether participation is total or partial. Here Project is the many side of Supervises, so Pid rows get a Mid foreign key, and because Project participates totally that column can be declared NOT NULL; if Project were partial instead, the same column placement would still apply, just allowing NULLs. So the correct design is exactly two tables: Manager(Mid, ...) and Project(Pid, ..., Mid), with no separate relationship table ever required for a 1:N association. Option B is invalid because a single-valued foreign key cannot hold multiple project references in one column, and options C and D wrongly introduce a third table."
},
{
  id: 'dbms-er-x3',
  q: 'Doctor(Did) and Patient(Pid) participate in an M:N relationship Treats. Suppose every doctor treats at least one patient and every patient is treated by at least one doctor, i.e. both sides participate totally. What is the minimum number of tables required to represent this design?',
  options: ['2', '3', '1', '4'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "An M:N relationship always requires its own junction table holding the primary keys of both participating entity sets (plus any descriptive attributes), because neither side can host a single-valued foreign key for what is fundamentally a many-valued association in both directions - a doctor can reference many patients and a patient can reference many doctors, and no single column in either entity table can capture that. This requirement is completely independent of participation constraints: making both sides total only guarantees that every Doctor row and every Patient row appears at least once in the junction table, but it never allows the junction table itself to be eliminated or merged into either entity. The minimum design is therefore always 3 tables for an M:N relationship - Doctor, Patient, and Treats(Did, Pid) - regardless of total or partial participation on either side. This total-participation-does-not-reduce-tables trap is one of the most frequently tested ER mapping subtleties."
},
{
  id: 'dbms-er-x4',
  q: 'Building(Bno) is a strong entity. Room is a weak entity with partial key RoomNo (room numbers such as 101 repeat across different buildings), identified through relationship Located_In with total participation of Room in that relationship. What is the primary key of the relational table representing Room?',
  options: ['RoomNo alone', 'Bno alone', 'The composite (Bno, RoomNo)', 'A newly introduced surrogate key, since weak entities cannot have a primary key of their own attributes'],
  answer: 2,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "A weak entity has no candidate key formed purely from its own attributes; RoomNo alone only distinguishes rooms within one building, not globally, since '101' can recur in many buildings. Uniqueness is restored by combining the weak entity's partial key with the primary key of its identifying owner, obtained through the identifying relationship - here Located_In links every Room to exactly one Building (total participation of Room, which is mandatory for identifying relationships). So the Room table is Room(Bno, RoomNo, ...), and its primary key is the composite (Bno, RoomNo): Bno alone would not distinguish different rooms in the same building, and RoomNo alone would not distinguish rooms with the same number in different buildings. No surrogate key is needed; the owner-key-plus-discriminator construction is the standard, sufficient solution for mapping any weak entity."
},
{
  id: 'dbms-er-x5',
  q: 'Supplier(Sid), Part(Pid) and Project(Jid) participate in a single ternary relationship Supplies, meaning a supplier supplies a specific part to a specific project, with Quantity recorded as a descriptive attribute of the relationship itself. No binary relationship exists among these entity sets. What is the minimum number of relational tables needed?',
  options: [
    'Three tables, one per entity, splitting Quantity arbitrarily among them',
    'Four tables: one per entity set plus a relationship table holding all three foreign keys together with Quantity',
    'One table merging all three entities and the relationship',
    'Six tables, obtained by decomposing the ternary relationship into three separate binary relationships'
  ],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "A ternary (degree-3) relationship generally requires its own dedicated table, because no single one of the three participating entity sets can host a foreign key pointing to the other two while also capturing which specific triple of (supplier, part, project) actually co-occurs. The correct minimum design keeps Supplier, Part, and Project as three separate entity tables and adds a fourth table Supplies(Sid, Pid, Jid, Quantity) whose primary key is typically the full combination (Sid, Pid, Jid), giving 4 tables total. Decomposing the ternary relationship into three pairwise binary relationships (option D) is a classic and serious error: it can lose information about which specific triples actually occurred together, since knowing that S1 supplies P1 to some project, and S1 supplies to J1 some part, and P1 goes to J1 from some supplier, does not tell you that all three facts came from the same original tuple. Options A and C are not valid decompositions at all."
},
{
  id: 'dbms-er-x6',
  q: 'A specialization of Vehicle into Car and Truck is total and disjoint: every vehicle is either a Car or a Truck, never both, and never neither. Using the single-table-with-type-discriminator mapping strategy, how many relational tables are needed and what NULL pattern, if any, results?',
  options: [
    'Three tables, and no NULLs appear anywhere',
    'One table containing all attributes of Vehicle, Car, and Truck plus a type-discriminator column; NULLs appear in whichever subclass-specific columns do not apply to a given row’s type',
    'Two tables, one for Car and one for Truck, with no NULLs',
    'One table, and NULLs never occur precisely because the specialization is total'
  ],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "The single-table (also called 'one table with a type flag') EER mapping strategy stores every superclass attribute plus every subclass-specific attribute from all subclasses in one wide table, together with an extra discriminator column recording which subclass each row belongs to. Totality guarantees every row has a defined type (Car or Truck), and disjointness guarantees it has exactly one type, but neither property prevents NULLs in the subclass-specific columns: a row typed 'Truck' has no meaningful value for a Car-only attribute such as NumberOfDoors, and vice versa, so those cells are NULL. Totality only rules out rows where every subclass attribute is NULL (since some subclass always applies); it does not make the irrelevant subclass columns non-NULL. This tradeoff - one table, simple queries, but wasted NULL-filled space - is precisely why the alternative superclass-plus-subclass-tables strategy exists for cases where NULLs are undesirable."
},
{
  id: 'dbms-er-x7',
  q: 'Using the standard EER mapping strategy where the superclass gets its own table and EACH subclass gets a separate table holding only that subclass’s specific attributes plus the inherited primary key (also serving as a foreign key referencing the superclass table), how many tables result for superclass Account with exactly two subclasses, SavingsAccount and CurrentAccount?',
  options: ['1', '2', '3', '4'],
  answer: 2,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "This mapping strategy (sometimes called 'multiple relations - superclass and subclasses', the most NULL-free of the standard EER-to-relational options) always produces one table for the superclass, storing every shared attribute, plus exactly one additional table per subclass, storing only that subclass's own specific attributes together with the primary key inherited from the superclass, which doubles as a foreign key referencing it. With Account as the superclass and two subclasses SavingsAccount and CurrentAccount, this yields 1 (Account) + 2 (SavingsAccount, CurrentAccount) = 3 tables total. This strategy works cleanly regardless of whether the specialization is total or partial, disjoint or overlapping, though a partial specialization means some superclass rows will have no matching row in either subclass table, and an overlapping one means a superclass row could have matching rows in more than one subclass table - neither situation requires changing the table count itself."
},
{
  id: 'dbms-er-x8',
  q: 'Relation R(A, B, C, D, E) has exactly two candidate keys: {A, B} and {C}. How many superkeys does R have in total?',
  options: ['20', '24', '16', '12'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "A superkey must contain at least one full candidate key. Use inclusion-exclusion over the attribute sets not fixed by each key. Superkeys containing {A,B}: the remaining attributes C, D, E are each free to be present or absent, giving 2^3 = 8 such superkeys. Superkeys containing {C}: the remaining attributes A, B, D, E are free, giving 2^4 = 16 such superkeys. Superkeys containing BOTH {A,B} and {C} simultaneously, i.e. containing {A,B,C}: the remaining D, E are free, giving 2^2 = 4 such superkeys - these were counted in both of the previous two totals and must be subtracted once. By inclusion-exclusion, total superkeys = 8 + 16 - 4 = 20. This matches option A. A common error is simply adding 8 + 16 = 24 without subtracting the double-counted overlap (option B), or computing only one of the two terms (options C, D)."
},
{
  id: 'dbms-er-x9',
  q: 'Table Employee(Eid, Dept) has candidate key Eid. Table DeptInfo(Dept, Manager) has candidate key Dept. Every Dept value appearing in Employee also appears in DeptInfo (referential integrity holds), and Employee currently has 50 tuples. Consider the natural join Employee NATURAL JOIN DeptInfo (joining on Dept). What is a candidate key of the result, and how many tuples does the join produce?',
  options: [
    'Manager is the candidate key; the result has 50 tuples',
    'Eid is the candidate key; the result has 50 tuples, because Dept is a key of DeptInfo so each Employee row matches exactly one DeptInfo row',
    'The composite (Eid, Dept) is the only candidate key; the result has more than 50 tuples due to fan-out',
    'Dept is the candidate key; the result has fewer than 50 tuples since some employees might lack a department'
  ],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Because Dept is a candidate key of DeptInfo, every distinct Dept value appears in at most one DeptInfo row - there is no fan-out on the join side, so joining does not multiply rows the way it would if the join attribute were not unique on either side. Since referential integrity guarantees every Employee.Dept value has a matching DeptInfo row, and that match is unique, each of the 50 Employee rows contributes exactly one joined row, giving exactly 50 tuples in the result - not more (no fan-out) and not fewer (no unmatched rows, since referential integrity holds and NATURAL JOIN only drops unmatched rows if any existed). For the key: Eid was already a candidate key of Employee, and since the join adds Manager as a functionally determined attribute of Dept (itself functionally determined by Eid via Employee), Eid remains a candidate key of the joined relation - it still uniquely determines every column, including the newly added Manager."
},
{
  id: 'dbms-er-x10',
  q: 'An ER diagram has strong entity Company(Cid), strong entity Product(Pid), a weak entity Warranty (partial key WCode) identified by Company through a binary identifying relationship Issues with total participation of Warranty, and a separate ternary relationship Covers among Company, Product, and Warranty carrying a descriptive attribute StoreId. What is the minimum number of tables needed for this entire design?',
  options: ['3', '4', '5', '6'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Count each construct's table requirement independently and sum: Company is a strong entity, needing 1 table, Company(Cid, ...). Product is a strong entity, needing 1 table, Product(Pid, ...). Warranty is a weak entity identified by Company via Issues; its table needs the owner key plus its own partial key as primary key, giving Warranty(Cid, WCode, ...) - 1 table, and Issues itself needs no separate table since identifying relationships never do. Covers is a ternary relationship among Company, Product, and Warranty, so like any ternary relationship it needs its own table holding all three participants' keys plus its descriptive attribute: Covers(Cid, Pid, Cid2_forWarrantysOwner..., WCode, StoreId) conceptually referencing Company, Product, and Warranty - 1 more table. Total: 1 (Company) + 1 (Product) + 1 (Warranty) + 1 (Covers) = 4 tables. Handling the weak entity and the ternary relationship as independent constructs and adding their individual table costs is the reliable way to solve composite ER designs like this one."
},
{
  id: 'dbms-er-x11',
  q: "Department(Dno PRIMARY KEY) and Employee(Eno PRIMARY KEY, Dno REFERENCES Department ON DELETE CASCADE) currently hold 5 Department rows and 20 Employee rows. Department D3 (one of the 5) currently has 4 employees referencing it. After executing DELETE FROM Department WHERE Dno = 'D3', how many rows remain in Employee?",
  options: ['20', '16', '15', '19'],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "ON DELETE CASCADE means that when a referenced Department row is deleted, every Employee row whose Dno foreign key pointed to that deleted Department row is automatically deleted as well, in order to preserve referential integrity (an Employee row can never be left pointing to a Department that no longer exists). Deleting D3 removes exactly the Employee rows with Dno = 'D3', and the question states there are 4 such rows. Starting from 20 Employee rows, the cascade removes 4, leaving 20 - 4 = 16 rows. Option A (20) would be correct only under ON DELETE NO ACTION or RESTRICT, where the delete would actually be rejected outright rather than silently leaving stale references - either way it would not leave Employee unchanged after a successful delete. Option C (15) and option D (19) do not match the stated count of 4 dependent employees."
},
{
  id: 'dbms-er-x12',
  q: 'An attribute such as HoursWorked, recording how many hours a specific employee worked on a specific project, is best modeled in the ER model as:',
  options: [
    'An attribute of the Employee entity set',
    'An attribute of the Project entity set',
    'A descriptive attribute attached to the Works_On relationship between Employee and Project',
    'A new strong entity set of its own'
  ],
  answer: 2,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "HoursWorked does not describe an employee in isolation (an employee's total hours vary per project) nor a project in isolation (a project's hours vary per employee); it describes a fact that only makes sense in the context of one specific (Employee, Project) pairing. This is exactly the situation a descriptive (relationship) attribute is designed for: an attribute attached directly to the relationship set itself, most naturally on an M:N relationship such as Works_On, since only there can a single employee-project combination carry its own distinct value. Attaching it to Employee (option A) would force one employee to have only one HoursWorked value across all projects, which is wrong if the employee works on several; attaching it to Project (option B) has the symmetric problem. Promoting it to a full entity set (option D) is unnecessary machinery for a simple scalar fact about a relationship instance."
},
{
  id: 'dbms-er-x13',
  q: 'Warehouse(Wid) and Manager(Mid) are related by a 1:1 relationship Manages: a warehouse may currently have no manager, and a manager may currently manage no warehouse (both sides participate partially). What is the minimum number of tables, and where should the foreign key be placed?',
  options: [
    'Three tables are always required for any 1:1 relationship',
    'Two tables; place a nullable foreign key on either side (commonly whichever side is queried more often), since merging into one table would force NULLs whenever a row on the chosen side currently lacks a partner',
    'One table, merging both entities regardless of participation constraints',
    'Two tables, but the foreign key must be duplicated on both sides simultaneously'
  ],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "When both sides of a 1:1 relationship participate only partially, there is no side whose rows are guaranteed a match, so folding the relationship entirely into either entity's table would create NULLs for every unmatched row on that side - unavoidable but perfectly legal, since foreign keys (unlike primary keys) are permitted to be NULL. The standard minimal design keeps Warehouse and Manager as two separate tables and places a single nullable foreign key on whichever side is more natural or more frequently queried, e.g. Warehouse(Wid, ..., Mid) with Mid nullable and referencing Manager(Mid); placing it on Manager instead is equally valid. A third junction table is never required for 1:1 relationships regardless of participation, and duplicating the foreign key on both sides (option D) would introduce redundancy and a consistency-maintenance burden with no benefit."
},
{
  id: 'dbms-er-x14',
  q: 'Aggregation is introduced into an ER diagram specifically to handle the situation where:',
  options: [
    'Two entity sets need to be related by a many-to-many relationship',
    'A relationship set itself needs to participate in another relationship - something the classical ER model cannot express directly by connecting one relationship diamond to another diamond',
    'An entity set needs to have more than one candidate key',
    'A weak entity set needs to be identified by more than one owner entity simultaneously'
  ],
  answer: 1,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: "In the classical ER model, a relationship diamond can only connect to entity rectangles, never directly to another relationship diamond - there is no notation for a relationship participating in a further relationship. Aggregation solves exactly this limitation: it treats an entire relationship set together with its participating entity sets as if it were a single abstract higher-level entity, which can then participate in a further relationship with some other entity set. The textbook example is a Works_On relationship between Employee and Project that itself needs to be Monitored_By a Manager; aggregation lets {Employee-Works_On-Project} act as one composite entity connecting to Manager via Monitored_By. Options A, C, and D describe entirely different ER constructs (an ordinary M:N relationship, multiple candidate keys, and multi-owner weak entities respectively) that are handled by other standard mechanisms, not by aggregation."
}
);

window.GATE_DATA.questions['dbms'].topics.find(function(t){return t.id==='dbms-ra-sql';}).questions.push(
{
  id: 'dbms-ra-sql-x1',
  q: 'R(A,B) = {(1,2),(1,3),(2,2),(2,4)} and S(B,C) = {(2,5),(2,6),(3,7)}. How many tuples are in R NATURAL JOIN S (joining on the common attribute B)?',
  options: ['5', '4', '6', '3'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Match each R tuple against every S tuple sharing the same B value, row by row. (1,2) has B=2, which matches both S tuples with B=2, namely (2,5) and (2,6), producing (1,2,5) and (1,2,6) - 2 result tuples. (1,3) has B=3, matching (3,7) only - 1 result tuple. (2,2) has B=2, again matching both (2,5) and (2,6) - 2 result tuples. (2,4) has B=4, which appears in no S tuple - 0 result tuples. Summing: 2 + 1 + 2 + 0 = 5 tuples total. This kind of row-by-row matching, rather than assuming one match per row, is essential whenever the join attribute is not a key on the side being matched against - here B repeats within S (twice for value 2), causing the fan-out that produces more result tuples than input R tuples."
},
{
  id: 'dbms-ra-sql-x2',
  q: 'Enrolled(Student, Course) = {(S1,C1),(S1,C2),(S1,C3),(S2,C1),(S2,C3),(S3,C1),(S3,C2),(S3,C3),(S4,C1)} and AllCourses(Course) = {C1,C2,C3}. How many students satisfy Enrolled / AllCourses (relational division - enrolled in every course in AllCourses)?',
  options: ['1', '2', '3', '4'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Division returns exactly those Student values whose set of associated Course values is a superset of AllCourses = {C1,C2,C3}. Check each student individually: S1 is enrolled in C1, C2, C3 - all three present, qualifies. S2 is enrolled in C1, C3 only - missing C2, fails. S3 is enrolled in C1, C2, C3 - all three present, qualifies. S4 is enrolled in C1 only - missing C2 and C3, fails. So exactly two students, S1 and S3, satisfy the division: the result set is {S1, S3}, giving a count of 2. This matches the standard division algorithm pi_Student(Enrolled) - pi_Student((pi_Student(Enrolled) x AllCourses) - Enrolled), which would likewise isolate S2 and S4 as the students with at least one missing (student, course) combination and subtract them out, leaving S1 and S3."
},
{
  id: 'dbms-ra-sql-x3',
  q: 'R(A,B) = {(1,10),(2,20),(3,30)} and S(B,C) = {(10,100),(20,200),(40,400)}. How many tuples result from R LEFT OUTER JOIN S (on B) versus R FULL OUTER JOIN S (on B)?',
  options: [
    '3 for left outer join, 3 for full outer join',
    '3 for left outer join, 4 for full outer join, since S has one unmatched tuple (B=40) that only the full outer join preserves',
    '4 for left outer join, 4 for full outer join',
    '3 for left outer join, 2 for full outer join'
  ],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Left outer join keeps every R tuple, padding with NULL where no S match exists, but never adds extra rows for unmatched S tuples. Matching on B: R's (1,10) matches S's (10,100); R's (2,20) matches S's (20,200); R's (3,30) has no match (no S tuple with B=30), so it appears padded as (3,30,NULL). That is exactly 3 tuples - one per R row, exactly matching R's cardinality since B is unique on both sides here. Full outer join additionally preserves unmatched S tuples: S's (40,400) has no matching R tuple (no R row with B=40), so it must appear once, padded as (NULL,40,400). That adds one extra row beyond the left outer join's 3, giving 4 tuples total for the full outer join. This illustrates the general rule: left outer join count is at least |R|, and full outer join additionally accounts for any S tuples with no R match at all."
},
{
  id: 'dbms-ra-sql-x4',
  q: 'Emp(Eid, Bonus) = (1,1000), (2,NULL), (3,2000), (4,NULL). Query1: SELECT COUNT(*) FROM Emp WHERE Bonus > 1000; Query2: SELECT COUNT(*) FROM Emp WHERE NOT (Bonus > 1000). What do Query1 and Query2 return, and why do the two counts not add up to 4?',
  options: [
    'Query1 returns 1, Query2 returns 3, and they do sum to 4 as expected',
    'Query1 returns 1, Query2 returns 1; they do not sum to 4 because rows with NULL Bonus make the condition evaluate to UNKNOWN under both queries and are excluded from both results',
    'Query1 returns 2, Query2 returns 2',
    'Query1 returns 1, Query2 returns 2'
  ],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Evaluate Bonus > 1000 per row under three-valued logic: row 1 (1000 > 1000) is FALSE; row 2 (NULL > 1000) is UNKNOWN; row 3 (2000 > 1000) is TRUE; row 4 (NULL > 1000) is UNKNOWN. Query1's WHERE keeps only rows evaluating to TRUE, so only row 3 qualifies: COUNT(*) = 1. For Query2, negate each: NOT FALSE = TRUE (row 1 qualifies), NOT UNKNOWN = UNKNOWN (rows 2 and 4 still excluded, negation does not turn UNKNOWN into TRUE), NOT TRUE = FALSE (row 3 excluded). So Query2 keeps only row 1: COUNT(*) = 1. The two counts (1 and 1) sum to 2, not 4, because rows 2 and 4 are excluded from BOTH queries - a condition and its logical negation do not partition a table into two complementary groups whenever NULLs are involved, since UNKNOWN survives negation as UNKNOWN, never becoming TRUE."
},
{
  id: 'dbms-ra-sql-x5',
  q: 'Emp(Eid, Dept, Salary) = (1,CS,50000), (2,CS,70000), (3,EE,60000), (4,EE,40000), (5,ME,80000). Query: SELECT Eid FROM Emp E1 WHERE Salary > (SELECT AVG(Salary) FROM Emp E2 WHERE E2.Dept = E1.Dept); How many Eid values does this correlated subquery return?',
  options: ['1', '2', '3', '4'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "The subquery is correlated: for each outer row, it recomputes the average salary of just that row's own department. Department CS has salaries 50000 and 70000, averaging 60000; Eid 1 (50000) is below 60000 and fails, Eid 2 (70000) exceeds 60000 and qualifies. Department EE has salaries 60000 and 40000, averaging 50000; Eid 3 (60000) exceeds 50000 and qualifies, Eid 4 (40000) is below and fails. Department ME has only Eid 5 (80000), so its own department average is exactly 80000, and 80000 > 80000 is FALSE (a single employee can never exceed their own department's average when they are the only member) - Eid 5 fails. Collecting the qualifying rows gives {Eid 2, Eid 3}, a count of exactly 2. This is a standard 'above the departmental average' pattern, and the single-member department is a deliberate trap testing whether the strict inequality is applied correctly."
},
{
  id: 'dbms-ra-sql-x6',
  q: "Sales(Region, Amount) = (N,100), (N,200), (S,50), (S,60), (S,70), (E,300). How many regions (groups) satisfy the query SELECT Region FROM Sales GROUP BY Region HAVING SUM(Amount) > 200?",
  options: ['1', '2', '3', '0'],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "First form the groups by Region and compute each group's aggregate before applying HAVING. Region N has rows 100 and 200, summing to 300. Region S has rows 50, 60, and 70, summing to 180. Region E has a single row, 300, summing to 300. Now apply the HAVING filter SUM(Amount) > 200 to each group's aggregate, not to individual rows: N's sum 300 > 200 is TRUE, so N is kept; S's sum 180 > 200 is FALSE, so S is dropped; E's sum 300 > 200 is TRUE, so E is kept. Exactly two groups, N and E, satisfy the HAVING condition, so the query returns 2 rows. Remember that HAVING operates strictly after GROUP BY has partitioned the rows and the aggregate has been computed per group - it can never filter on a per-row basis the way WHERE does."
},
{
  id: 'dbms-ra-sql-x7',
  q: 'Person(Id, Name, Age) = (1,A,30), (2,B,30), (3,C,25), (4,D,30). How many result rows does SELECT COUNT(*) FROM Person P1, Person P2 WHERE P1.Age = P2.Age AND P1.Id < P2.Id return?',
  options: ['2', '3', '4', '6'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "This self-join with the condition P1.Id < P2.Id counts each unordered pair of distinct people sharing the same Age exactly once (the strict inequality on Id prevents both a person pairing with itself and each pair being counted twice in both orders). Group by Age first: Age 30 contains Ids {1, 2, 4} - three people, and the number of pairs with P1.Id < P2.Id among them is C(3,2) = 3, namely (1,2), (1,4), and (2,4). Age 25 contains only Id {3} - a single person, giving C(1,2) = 0 pairs, since a pair needs two distinct rows. Total pairs = 3 + 0 = 3. This self-join-with-inequality pattern is the standard SQL idiom for enumerating unordered pairs sharing a property without double-counting or including a row paired with itself, and it generalizes to C(k,2) = k(k-1)/2 pairs for any group of k rows sharing the same value."
},
{
  id: 'dbms-ra-sql-x8',
  q: 'A = (SELECT x FROM T1) = {1,2,3,4,5} and B = (SELECT x FROM T2) = {3,4,5,6,7}, both duplicate-free sets. What are the cardinalities of (A EXCEPT B) and (A INTERSECT B) respectively?',
  options: ['2 and 3', '3 and 2', '2 and 2', '5 and 5'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "A EXCEPT B keeps only the elements of A that do NOT appear in B at all. A = {1,2,3,4,5} and B = {3,4,5,6,7} share the elements 3, 4, and 5, so removing those from A leaves {1, 2} - a cardinality of 2. A INTERSECT B keeps only the elements common to both sets, which is exactly {3, 4, 5} - a cardinality of 3. So (A EXCEPT B) has 2 elements and (A INTERSECT B) has 3 elements, matching option A. As a sanity check, these two results together with (B EXCEPT A) = {6,7} (cardinality 2) should partition A UNION B = {1,2,3,4,5,6,7} (cardinality 7) without overlap: 2 + 3 + 2 = 7, confirming the arithmetic is consistent."
},
{
  id: 'dbms-ra-sql-x9',
  q: 'R(A,B) has A as a candidate key and holds 30 tuples. S(B,C) has B as a candidate key. R.B is a foreign key referencing S.B, with no NULL values in R.B, so every R tuple is guaranteed to match some S tuple. What are the minimum and maximum possible numbers of tuples in R NATURAL JOIN S (on B)?',
  options: [
    'Minimum 20, maximum 30',
    'Minimum 30, maximum 30 - always exactly 30, because B is a key of S so each of the 30 R rows matches exactly one S row',
    'Minimum 0, maximum 30',
    'Minimum 30, maximum 600'
  ],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Because B is a candidate key of S, no B value can repeat within S, so any R tuple can match at most one S tuple - fan-out on the S side is structurally impossible. Because R.B is a non-NULL foreign key referencing S.B, referential integrity guarantees every one of the 30 R tuples has at least one matching S tuple - so no R tuple is ever dropped for lack of a match either. Combining 'at most one match' with 'at least one match' forces exactly one match per R tuple, regardless of how S's other tuples or C values are arranged: the join produces exactly 30 tuples every single time, with no variation possible - so the minimum and maximum coincide at 30. This is a direct consequence of a foreign key referencing a candidate key: such a join behaves like a lookup that neither loses rows nor duplicates them."
},
{
  id: 'dbms-ra-sql-x10',
  q: 'T(X) = 10, NULL, 20, NULL, 30 (five rows). What do COUNT(*), COUNT(X), SUM(X), and AVG(X) return respectively for SELECT COUNT(*), COUNT(X), SUM(X), AVG(X) FROM T?',
  options: ['5, 3, 60, 20', '5, 5, 60, 12', '5, 3, 60, 12', '3, 3, 60, 20'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "COUNT(*) counts every row in the table regardless of NULLs, so it counts all 5 rows. COUNT(X), SUM(X), and AVG(X) all ignore rows where X is NULL, operating only on the 3 non-NULL values 10, 20, and 30. COUNT(X) is therefore 3, not 5. SUM(X) adds only the non-NULL values: 10 + 20 + 30 = 60. AVG(X) divides that sum by the COUNT of non-NULL values, not by COUNT(*): 60 / 3 = 20, not 60 / 5 = 12. So the correct tuple of results is (5, 3, 60, 20), matching option A. The AVG(X) = 12 answer in option B and C is the classic trap of dividing by the total row count instead of the count of non-NULL values - every standard aggregate function except COUNT(*) silently skips NULLs entirely rather than treating them as zero."
},
{
  id: 'dbms-ra-sql-x11',
  q: 'Emp(Eid, MgrId) = (1,2), (2,NULL), (3,1). How many rows does SELECT Eid FROM Emp WHERE MgrId NOT IN (SELECT MgrId FROM Emp) return?',
  options: ['0', '1', '2', '3'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "The inner subquery SELECT MgrId FROM Emp returns the set {2, NULL, 1} - it includes the NULL from Eid 2's row, since a plain SELECT does not filter out NULLs. NOT IN is defined as a conjunction of inequalities: 'X NOT IN (v1, v2, v3)' means 'X <> v1 AND X <> v2 AND X <> v3'. Whenever one of those values is NULL, the corresponding inequality (X <> NULL) evaluates to UNKNOWN for every X, and UNKNOWN AND anything is never TRUE (it is UNKNOWN unless another conjunct is FALSE, and equality/inequality comparisons here are never FALSE against a value that actually differs unless it's the NULL case) - concretely, 'X <> NULL' is UNKNOWN regardless of X, so the whole AND chain collapses to at best UNKNOWN for every row, never TRUE. Since WHERE only keeps rows evaluating to TRUE, the entire query returns 0 rows, regardless of what the actual MgrId values are. This is the single most important NOT IN pitfall: NOT IN against any subquery that can produce a NULL silently returns no rows at all, which is why NOT EXISTS is the safer idiom."
},
{
  id: 'dbms-ra-sql-x12',
  q: 'Student(Sid) = S1, S2, S3, S4. Enroll(Sid, Cid) = (S1,C1), (S1,C2), (S2,C1), (S4,C3). How many rows does SELECT COUNT(*) FROM Student S WHERE EXISTS (SELECT * FROM Enroll E WHERE E.Sid = S.Sid) return?',
  options: ['2', '3', '4', '1'],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "EXISTS checks, for each outer Student row, whether the correlated subquery returns at least one row - it does not care how many rows or what their column values are, only whether the set is non-empty. S1 has enrollment rows (S1,C1) and (S1,C2), so the subquery is non-empty and S1 qualifies. S2 has (S2,C1), non-empty, qualifies. S3 has no rows at all in Enroll, so the subquery is empty and S3 is excluded. S4 has (S4,C3), non-empty, qualifies. Three students - S1, S2, and S4 - satisfy the EXISTS condition, so COUNT(*) returns 3. This is the standard idiom for 'students who are enrolled in at least one course', and it generalizes directly to NOT EXISTS for finding students enrolled in none, which would return just S3, a count of 1."
},
{
  id: 'dbms-ra-sql-x13',
  q: "Course(Cid) = C1, C2, C3. Enroll(Sid,Cid) = (S1,C1), (S1,C2), (S1,C3), (S2,C1), (S4,C3). Consider the double-negation 'for all' query: SELECT Sid FROM Student S WHERE NOT EXISTS (SELECT Cid FROM Course C WHERE NOT EXISTS (SELECT * FROM Enroll E WHERE E.Sid = S.Sid AND E.Cid = C.Cid)); with Student = {S1,S2,S3,S4}. How many students does this return?",
  options: ['0', '1', '2', '4'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "This is the classic double-NOT-EXISTS pattern expressing 'students enrolled in every course in Course', i.e. relational division in SQL. Read it as: a student S qualifies unless there EXISTS some course C for which NO matching enrollment row exists for S - so S qualifies only if every course has a matching enrollment. Check each student: S1 has enrollments in C1, C2, and C3 - every course in {C1,C2,C3} is covered, so the inner NOT EXISTS finds no uncovered course, and S1 qualifies. S2 has only C1 - courses C2 and C3 are uncovered, so the inner subquery finds an uncovered course, and S2 is excluded. S3 has no enrollments at all - all three courses are uncovered, excluded. S4 has only C3 - C1 and C2 are uncovered, excluded. Only S1 satisfies the condition, so exactly 1 student is returned - matching how relational division would isolate the single student enrolled in the complete course set."
},
{
  id: 'dbms-ra-sql-x14',
  q: 'Emp(Eid, Dept, Salary) = (1,CS,40000), (2,CS,60000), (3,EE,55000), (4,EE,45000), (5,ME,70000), (6,CS,65000). Evaluate the relational algebra expression pi_Dept(sigma_Salary greater than 50000(Emp)) under pure set semantics. How many tuples does the result contain?',
  options: ['4', '3', '2', '5'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "First apply the selection sigma_Salary>50000 to filter rows: qualifying rows are Eid 2 (60000), Eid 3 (55000), Eid 5 (70000), and Eid 6 (65000) - 4 rows survive, with Dept values CS, EE, ME, and CS respectively. Then apply the projection pi_Dept: relational algebra projection uses SET semantics, meaning duplicate result tuples are automatically eliminated after keeping only the Dept column. The 4 selected rows yield the Dept values {CS, EE, ME, CS}, and after removing the duplicate CS, the distinct set is {CS, EE, ME} - exactly 3 tuples. This is the standard trap distinguishing pure relational algebra projection from a plain SQL SELECT Dept FROM Emp WHERE Salary > 50000 without DISTINCT, which under SQL's bag semantics would instead return all 4 rows including the repeated CS value; only RA projection (or SQL's SELECT DISTINCT) collapses it down to 3."
}
);

window.GATE_DATA.questions['dbms'].topics.find(function(t){return t.id==='dbms-normalization';}).questions.push(
{
  id: 'dbms-normalization-x1',
  q: 'Relation R(A,B,C,D) has functional dependency set F = {A->B, B->C, C->D, D->A}, forming a cycle. How many candidate keys does R have?',
  options: ['1', '2', '4', '3'],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Compute the closure of each single attribute, since the FDs form a cycle where every attribute eventually reaches every other. A+: A->B adds B, B->C adds C, C->D adds D, D->A already have A; A+ = {A,B,C,D}, all attributes, so A is a candidate key (a single attribute is automatically minimal). By the identical cyclic reasoning, B+ = {B,C,D,A} (via B->C->D->A) = all attributes, so B is also a candidate key. C+ = {C,D,A,B} = all, so C is a candidate key. D+ = {D,A,B,C} = all, so D is a candidate key. Every one of the four single attributes independently closes to the full attribute set, and no smaller (empty) subset can be a key, so all four are candidate keys. This cyclic FD pattern - where each attribute alone determines everything - is a well-known GATE trap that yields far more candidate keys than the composite-key patterns test-takers usually expect."
},
{
  id: 'dbms-normalization-x2',
  q: 'Relation R(A,B,C,D,E) has functional dependency set F = {AB->C, C->D, D->E, E->A}. How many candidate keys does R have?',
  options: ['2', '4', '3', '5'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "B never appears on the right-hand side of any FD, so B must belong to every candidate key. B alone closes to just {B}, so B must be paired with something. Testing AB: AB+ adds C (AB->C), then D (C->D), then E (D->E), then A already present - AB+ = all 5 attributes, and neither A alone nor B alone closes to everything, so AB is a minimal candidate key. Because C, D, E form a chain C->D->E->A that loops back to A, and A combined with B unlocks C via AB->C, ANY single one of {A,C,D,E} paired with B lets you traverse the entire cycle: BC+ reaches D,E,A then C already held; BD+ reaches E,A then C via AB->C; BE+ reaches A then C via AB->C, then D. Each of AB, BC, BD, BE closes to all 5 attributes and each is minimal (no singleton subset closes fully), giving exactly 4 candidate keys, all containing B."
},
{
  id: 'dbms-normalization-x3',
  q: 'Relation R(A,B,C,D) has functional dependency set F = {A->B, A->C, C->D}. The only candidate key is verified to be {A}. What is the highest normal form satisfied by R?',
  options: ['1NF', '2NF', '3NF', 'BCNF'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Since the sole candidate key {A} is a single attribute, no partial dependency on a proper subset of the key is even possible, so 2NF is automatically satisfied once 1NF holds (assumed here). Checking 3NF requires every non-trivial FD X->Y to have either X as a superkey or Y as a prime attribute. A->B and A->C both have A as the determinant, which is the superkey, so both satisfy 3NF trivially. But C->D is the problem: C+ = {C,D} only, which is not all of R, so C is not a superkey; and D is not part of any candidate key, so D is not prime either. Neither exception condition holds, so C->D is a transitive dependency that violates 3NF. Since R satisfies 2NF but fails 3NF, the highest normal form R achieves is exactly 2NF - a textbook example of a transitive dependency (A determines C, C determines D, so A transitively determines D through a non-key attribute)."
},
{
  id: 'dbms-normalization-x4',
  q: 'Relation R(A,B,C,D,E) has FD set F = {A->B, B->C, CD->E}. R is decomposed into R1(A,B,C) and R2(C,D,E). Is this decomposition lossless-join?',
  options: [
    'Yes, since C+ = {C,D,E} covers R2',
    'No, since the common attribute C alone closes only to {C}, which is neither a superkey of R1 nor of R2',
    'Yes, since C appears in both relations, which is always sufficient',
    'Cannot be determined without additional functional dependencies'
  ],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "The lossless-join test for a binary decomposition into R1 and R2 requires that the common attribute set, R1 intersect R2, functionally determine ALL of R1 or ALL of R2 (using the closure under F, not just the FDs as literally stated). Here R1 intersect R2 = {C}, since C is the only attribute shared between R1(A,B,C) and R2(C,D,E). Compute C+ using F = {A->B, B->C, CD->E}: starting from {C}, no FD has C alone as its full left-hand side (CD->E needs D too, which is absent), so no FD can fire, and C+ = {C} - it never reaches A, B (needed for R1) or D, E (needed for R2). Since C+ covers neither R1's attribute set {A,B,C} nor R2's attribute set {C,D,E}, the lossless-join condition fails on both sides, and this decomposition is LOSSY: rejoining R1 and R2 via natural join on C can introduce spurious tuples not present in the original R."
},
{
  id: 'dbms-normalization-x5',
  q: 'Relation R(A,B,C) has FD set F = {A->B, B->C, C->A}. R is decomposed into R1(A,B) and R2(B,C). Is this decomposition dependency-preserving?',
  options: [
    'No, because C->A cannot be checked without physically joining R1 and R2',
    'Yes, because C->A can be derived from the FDs projected onto R1 and R2 - specifically B->A (from B+ = {A,B,C} restricted to R1) together with C->B (from C+ restricted to R2) - without ever needing to join the relations',
    'No, because A->B is lost when projecting onto R2',
    'Cannot be determined from the given information'
  ],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Since F is a full cycle A->B->C->A, every single attribute's closure under F is the entire relation: A+ = B+ = C+ = {A,B,C}. Projecting F onto R1(A,B) means keeping only the parts of each closure restricted to {A,B}: A+ restricted gives A->B (already known), and B+ restricted to {A,B} gives B->A (new, since B+ includes A). So F1 = {A->B, B->A}. Projecting onto R2(B,C) similarly gives F2 = {B->C, C->B} (since B+ and C+ both include the other, restricted to {B,C}). Now check whether F1 union F2 implies the original C->A without joining: compute C+ using only F1 union F2 = {A->B, B->A, B->C, C->B}: start {C}, apply C->B to get {B,C}, apply B->A to get {A,B,C} - C->A is derivable purely from the projected dependencies. So the decomposition IS dependency-preserving."
},
{
  id: 'dbms-normalization-x6',
  q: 'Compute the minimal (canonical) cover of F = {A->BC, B->C, AB->D} on relation R(A,B,C,D). Which of the following is the resulting minimal cover?',
  options: [
    '{A->B, A->C, B->C, A->D}',
    '{A->B, A->D, B->C}',
    '{A->BC, B->C, A->D}',
    '{A->B, A->C, AB->D}'
  ],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Step 1, split right-hand sides into singletons: A->BC becomes A->B and A->C, giving {A->B, A->C, B->C, AB->D}. Step 2, remove extraneous left-hand-side attributes: test AB->D for attribute A being extraneous by computing B+ using the full set - B+ = {B,C} (via B->C), which does not include D, so A is NOT extraneous. Test B being extraneous by computing A+ using the full set - A->B gives B, A->C gives C, and now with A and B both available AB->D fires, giving A+ = {A,B,C,D}, which includes D, so B IS extraneous; drop it, reducing AB->D to A->D. The set is now {A->B, A->C, B->C, A->D}. Step 3, remove redundant FDs: testing A->C, compute A+ using only {A->B, B->C, A->D} - A->B gives B, B->C gives C, A->D gives D, so A+ = {A,B,C,D} already includes C, meaning A->C is redundant; remove it. The remaining {A->B, B->C, A->D} has no further extraneous attributes or redundant FDs, giving the minimal cover with 3 dependencies."
},
{
  id: 'dbms-normalization-x7',
  q: 'An instance of R(A,B,C) contains exactly the tuples (1,1,1), (1,1,2), (2,2,1), (2,2,2). Which of the following functional dependencies is actually satisfied by this instance?',
  options: ['A -> C', 'C -> A', 'A -> B', 'B -> C'],
  answer: 2,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "Check each candidate FD by scanning for any two tuples that agree on the determinant but disagree on the dependent. For A->B: tuples with A=1 both have B=1 (consistent), and the tuple with A=2 has B=2 (only one tuple, trivially consistent) - so A->B holds on this instance. For A->C: the two tuples with A=1 have C=1 and C=2 respectively - they agree on A but disagree on C, so A->C is VIOLATED. For C->A: the two tuples with C=1 have A=1 and A=2 respectively - they agree on C but disagree on A, so C->A is VIOLATED. For B->C: the two tuples with B=1 have C=1 and C=2 respectively - they agree on B but disagree on C, so B->C is VIOLATED. Only A->B survives the row-by-row check on this specific instance, so it is the correct answer; remember that satisfying an FD on one instance does not prove it holds on the schema in general, only that this particular data does not contradict it."
},
{
  id: 'dbms-normalization-x8',
  q: 'Relation R(A,B,C) has FD set F = {AB->C, C->A}, giving candidate keys AB and BC (verify: AB+ = ABC via AB->C; BC+ = ABC via C->A). The FD C->A violates BCNF since C+ = {A,C} is not a superkey. Applying the BCNF decomposition algorithm on C->A splits R into R1(A,C) and R2(B,C). Is this decomposition dependency-preserving?',
  options: [
    'Yes, since both original FDs project directly onto R1 and R2 unchanged',
    'No, because AB->C cannot be verified from the FDs projected onto R1 and R2 without computing their join',
    'Yes, because C->A alone already implies AB->C',
    'No, because R1 and R2 are not even a lossless-join decomposition'
  ],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "R1(A,C) inherits C->A directly (and its trivial converse-free closure), so F1 = {C->A}. R2(B,C) has only two attributes; checking whether B->C or C->B hold in F+ restricted to {B,C}: B+ under the original F is just {B} (no FD starts with B alone) and C+ is {A,C}, so neither B->C nor C->B holds - F2 has no non-trivial dependencies. Now test whether F1 union F2 = {C->A} implies the original AB->C: compute (AB)+ using only C->A - starting from {A,B}, no FD has A or B alone (or together) as a matching left-hand side within {C->A}, so (AB)+ stays {A,B}, never reaching C. Since AB->C cannot be derived from the projected dependencies without physically joining R1 and R2 back together, dependency preservation FAILS. (Note the decomposition is nonetheless lossless, since C+ = {A,C} makes C a superkey of R1, so option D's premise about losslessness is incorrect.)"
},
{
  id: 'dbms-normalization-x9',
  q: 'Relation R(A,B,C) has FD set F = {A->B, A->C}, and no other non-trivial dependencies hold. What is the highest normal form satisfied by R?',
  options: ['1NF', '2NF', '3NF', 'BCNF'],
  answer: 3,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: "First find the candidate keys: B and C never appear on the left-hand side of any FD, so they cannot help form a key; A never appears on the right-hand side, so A must be in every key. A+ = {A,B,C} directly from A->B and A->C, which is all of R, so A alone is the sole candidate key. Since the key is a single attribute, 2NF is automatic (no proper non-empty subset of a singleton key exists, so partial dependency is impossible). For 3NF and BCNF, check every non-trivial FD: A->B has A as its determinant, and A is the (sole) candidate key, hence a superkey - condition satisfied. A->C likewise has A as determinant, again a superkey - condition satisfied. Since BCNF requires every determinant to be a superkey and both FDs already satisfy that stronger condition, R is in BCNF, which is the highest normal form in the hierarchy (BCNF implies 3NF implies 2NF implies 1NF), so R satisfies all four levels."
},
{
  id: 'dbms-normalization-x10',
  q: 'Relation R(A,B,C,D) has sole candidate key {A,B} (verify: A and B never appear as a right-hand side, so both are mandatory; AB+ = ABCD via AB->C and AB->D, and neither A nor B alone closes fully). Given FDs AB->C, AB->D, and additionally B->C holds. What is the highest normal form satisfied by R?',
  options: ['1NF', '2NF', '3NF', 'BCNF'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "The candidate key {A,B} is composite, so partial dependencies become possible: 2NF requires every non-prime attribute to be fully dependent on the ENTIRE candidate key, not just part of it. Here C and D are the non-prime attributes (A and B are prime, being the key itself). D depends only on the full key AB (via AB->D), which is fine. But C depends on B alone via the given FD B->C, and B is a proper subset of the candidate key AB - this is precisely a partial dependency, since C is fully determined by just part of the key rather than needing both A and B. This directly violates 2NF (AB->C becomes redundant information once B->C alone already pins down C, regardless of A's value). Since 2NF itself fails, R cannot satisfy 3NF or BCNF either (each higher normal form requires all lower ones), so the highest normal form R actually achieves is only 1NF."
},
{
  id: 'dbms-normalization-x11',
  q: 'Relation R(X,Y,Z) has FD set F = {XY->Z, Z->Y}. Verify the candidate keys are XY and XZ (X is mandatory since it never appears as an RHS; XY+ = XYZ via XY->Z; XZ+ = XYZ via Z->Y), making X, Y, and Z all prime attributes. What is the highest normal form satisfied by R?',
  options: ['1NF', '2NF', '3NF', 'BCNF'],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "Since both candidate keys, XY and XZ, are composite but every attribute of R (X, Y, and Z) belongs to at least one of them, there are no non-prime attributes at all, so 2NF holds automatically (2NF's partial-dependency restriction only applies to non-prime attributes). For 3NF, check each FD: XY->Z has XY as determinant, which is a superkey, satisfying 3NF directly. Z->Y has Z as determinant, and Z+ = {Y,Z} is not all of R, so Z is NOT a superkey - but 3NF's exception clause allows this as long as the dependent attribute is prime, and Y IS prime (it belongs to candidate key XY), so this FD also satisfies 3NF via the exception. Since every FD passes the 3NF test, R is in 3NF. However, BCNF has no such exception: Z->Y still requires Z to be a superkey, which it is not, so BCNF is violated. R is therefore in 3NF but not in BCNF - the highest normal form satisfied is exactly 3NF."
},
{
  id: 'dbms-normalization-x12',
  q: 'Relation R(A,B,C,D) has the single functional dependency AB->CD, and no other dependencies hold. How many candidate keys does R have?',
  options: ['1', '2', '3', '4'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "Neither A nor B ever appears on the right-hand side of any FD, so both must belong to every candidate key - they form the mandatory core. Computing (AB)+ using the only available FD: starting from {A,B}, AB->C D fires directly, giving (AB)+ = {A,B,C,D}, which is all of R, so AB is a superkey. Checking minimality: A+ alone = {A} (no FD has A alone as a matching left-hand side) and B+ alone = {B} (same reasoning), so neither singleton subset is a superkey, confirming AB is minimal. Since C and D never appear on the left-hand side of any FD, they can never help determine other attributes and so can never be part of any candidate key by themselves or in combination with anything else beyond AB. With no other functional dependencies given, AB is the unique candidate key, and R has exactly 1 candidate key."
},
{
  id: 'dbms-normalization-x13',
  q: 'F = {A->B, B->C, A->C} is defined on relation R(A,B,C). After removing all extraneous left-hand-side attributes and all redundant dependencies, how many functional dependencies remain in the minimal cover?',
  options: ['3', '2', '1', '0'],
  answer: 1,
  marks: 1,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "All three FDs already have single-attribute right-hand sides, so no splitting is needed, and all left-hand sides are already single attributes, so no extraneous-attribute removal within any one FD is possible either. The only remaining step is checking for redundant FDs. Test A->C: temporarily remove it and compute A+ using only {A->B, B->C} - A->B gives B, then B->C gives C, so A+ = {A,B,C} already includes C without needing A->C directly; A->C is REDUNDANT (it is implied transitively) and gets dropped. Test A->B: temporarily remove it and compute A+ using only {B->C, A->C} - only A->C can fire from A, giving A+ = {A,C}, which does not include B, so A->B is NOT redundant and must stay. Test B->C: temporarily remove it and compute B+ using only {A->B, A->C} - no FD has B alone as its left-hand side, so B+ = {B}, missing C; B->C is NOT redundant and must stay. The minimal cover is {A->B, B->C}, containing exactly 2 dependencies."
},
{
  id: 'dbms-normalization-x14',
  q: 'Relation R(A,B,C,D,E) has FD set {A->B, A->C, A->D, A->E}, making A the sole candidate key. R is decomposed into R1(A,B,C) and R2(A,D,E). Is this decomposition lossless-join?',
  options: [
    'Yes, because the common attribute A is a superkey of R and hence trivially determines both R1 and R2 completely',
    'No, because A alone cannot determine D and E without physically joining R1 and R2',
    'Cannot be determined without separately checking the closures of D and E',
    'No, because R1 and R2 do not share enough attributes for a safe rejoin'
  ],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "The common attribute set between R1(A,B,C) and R2(A,D,E) is {A}. The lossless-join test requires this common set to functionally determine all of R1 or all of R2 under F's closure. Since A->B, A->C, A->D, and A->E are all given directly, A+ = {A,B,C,D,E}, which is the entire attribute set of R - meaning A is in fact a superkey (indeed the sole candidate key) of the original relation. A superkey of R trivially determines every attribute of R, which certainly includes all of R1's attributes {A,B,C} and all of R2's attributes {A,D,E}. Since A->R1 (and equally A->R2) holds, the lossless-join condition is satisfied on both sides simultaneously, confirming the decomposition is lossless. This is the general and easily recognizable pattern: whenever a decomposition splits a relation along a key that is preserved whole in every fragment, the join is guaranteed lossless."
}
);

window.GATE_DATA.questions['dbms'].topics.find(function(t){return t.id==='dbms-indexing';}).questions.push(
{
  id: 'dbms-indexing-x1',
  q: 'A B+-tree of order 4 (maximum 4 pointers per node) has exactly 3 levels: the root, one level of internal nodes below it, and the leaf level. Using minimum-occupancy rules (root minimum 2 pointers; other internal nodes minimum ceil(4/2)=2 pointers; leaves minimum ceil((4-1)/2)=2 records), what are the maximum and minimum numbers of records this tree can index?',
  options: ['Maximum 48, minimum 8', 'Maximum 36, minimum 6', 'Maximum 48, minimum 12', 'Maximum 64, minimum 8'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "For the maximum, use full occupancy at every level: the root can have up to 4 pointers to internal nodes, each internal node can have up to 4 pointers to leaves, and each leaf can hold up to (order-1) = 3 records. Maximum records = 4 (root fanout) x 4 (internal fanout) x 3 (records per leaf) = 48. For the minimum, use the minimum-occupancy rule at every level: the root needs at least 2 pointers (a special, looser minimum that applies only to the root), each non-root internal node needs at least ceil(4/2) = 2 pointers, and each leaf needs at least ceil((4-1)/2) = 2 records. Minimum records = 2 (root) x 2 (internal) x 2 (leaf) = 8. Multiplying fanouts level by level, using maximum values throughout for the upper bound and minimum values throughout for the lower bound, gives the full range of records the tree's fixed 3-level shape can index."
},
{
  id: 'dbms-indexing-x2',
  q: 'A B+-tree has leaf nodes each storing at most 99 records and internal nodes each having at most 100 pointers (order 100). To index exactly 10,000 records with maximum occupancy everywhere, how many levels (root, internal levels, and the leaf level, counting the root itself as one level) are required at minimum?',
  options: ['2', '3', '4', '5'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Work upward from the leaves using maximum fanout at every level. Leaves needed: each leaf holds at most 99 records, so ceil(10000 / 99) = 102 leaves are required (since 101 x 99 = 9999, one short of 10000, forcing a 102nd leaf). Next level up: each internal node can point to at most 100 leaves, so ceil(102 / 100) = 2 internal nodes are needed to cover all 102 leaves. One more level up: can a single node point to these 2 internal nodes? Yes - a root with just 2 pointers is well within the maximum of 100 (and satisfies the root's looser minimum of 2 as well), so a single root node suffices at the very top. Counting levels from the root downward: root (1 node) - internal level (2 nodes) - leaf level (102 nodes) - that is exactly 3 levels total, with no need for a fourth level since 2 internal nodes already fit under one root."
},
{
  id: 'dbms-indexing-x3',
  q: 'Keys 5, 10, 15, 20, 25 are inserted, in this order, into an initially empty B+-tree of order 3 (maximum 2 keys per leaf node; maximum 2 keys / 3 pointers per internal node). How many node splits occur in total during this sequence of insertions?',
  options: ['1', '2', '3', '4'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Simulate step by step. Insert 5: leaf = [5]. Insert 10: leaf = [5,10] (at capacity, no overflow yet). Insert 15: the leaf would need to hold [5,10,15], exceeding the maximum of 2 - overflow, so it SPLITS: left leaf keeps [5,10], right leaf gets [15], and the smallest key of the right leaf (15) is copied up to form a new root [15] pointing to both leaves. This is split #1. Insert 20: 20 belongs in the right leaf [15], which becomes [15,20] - exactly at capacity, no overflow. Insert 25: the right leaf would need [15,20,25], exceeding capacity - overflow, so it SPLITS again: left keeps [15,20], right gets [25], and 25 is copied up to the root. The root, currently holding just key [15] with 2 pointers, now absorbs key 25 and a third pointer, becoming [15,25] with 3 pointers - exactly at its own maximum of 2 keys / 3 pointers, so NO further (root) split is triggered. Total splits across the whole sequence: exactly 2, both at the leaf level."
},
{
  id: 'dbms-indexing-x4',
  q: 'Keys 10, 20, 30, 40, 50, 60, 70 are inserted, in this order, into an initially empty B+-tree of order 3 (maximum 2 keys per leaf; maximum 2 keys / 3 pointers per internal node). How many total node splits occur (counting both leaf splits and any internal/root splits), and what is the final height of the tree (the root counts as one level)?',
  options: [
    '3 splits, final height 2 levels',
    '4 splits, final height 3 levels - three leaf splits occur (triggered while inserting 30, 50, and 70), and a fourth split - of the root itself - occurs when the root overflows while absorbing the key pushed up from the third leaf split',
    '4 splits, final height 2 levels',
    '5 splits, final height 3 levels'
  ],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Insert 10, 20: leaf = [10,20]. Insert 30: overflow -> split leaf into [10,20] and [30]; root becomes [30] (split #1). Insert 40: goes into the [30] leaf, becomes [30,40], no overflow. Insert 50: the [30,40] leaf would need [30,40,50] - overflow -> split into [30,40] and [50], pushing 50 up; root absorbs it, becoming [30,50] with 3 pointers, still within its 2-key/3-pointer maximum, so no root split yet (split #2, leaf only). Insert 60: goes into the [50] leaf, becomes [50,60], no overflow. Insert 70: the [50,60] leaf would need [50,60,70] - overflow -> split into [50,60] and [70], pushing 70 up (split #3, leaf). Now the root, already holding [30,50] with 3 pointers (at its maximum), must absorb key 70 and a fourth pointer - this exceeds the maximum, so the ROOT ITSELF SPLITS (split #4): middle key 50 is pushed further up to form a brand-new root, increasing the tree's height from 2 levels to 3. Total: 4 splits, final height 3."
},
{
  id: 'dbms-indexing-x5',
  q: 'In a B+-tree of order p=5 (maximum 5 pointers, maximum 4 keys per node), what are the maximum number of keys in a single leaf node and the minimum number of keys in a non-root leaf node (using the ceil((p-1)/2) convention)?',
  options: ['Maximum 4, minimum 2', 'Maximum 5, minimum 3', 'Maximum 4, minimum 1', 'Maximum 3, minimum 2'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "A leaf node in a B+-tree of order p can hold at most (p-1) search-key values, each paired with its own record pointer, since a leaf devotes one slot per key-pointer pair rather than the pointer-key-pointer routing structure of internal nodes. With p=5, the maximum is 5-1 = 4 keys per leaf. The minimum occupancy rule for a non-root leaf requires at least ceil((p-1)/2) key-pointer pairs, so as to guarantee every leaf stays at least half full and the tree remains balanced and space-efficient; with p=5, this is ceil(4/2) = 2 keys. So a non-root leaf in this tree always holds between 2 and 4 keys inclusive - option A. Note that this minimum-occupancy rule explicitly excludes the root, which is allowed to be less full (down to just 1 key if it is also a leaf, in the trivial single-node-tree case) since it has no sibling to redistribute with."
},
{
  id: 'dbms-indexing-x6',
  q: 'For a B+-tree of order p=7 (maximum 7 pointers per internal node), what are the maximum and minimum number of search-key values stored in a non-root internal node?',
  options: ['Maximum 6, minimum 3', 'Maximum 7, minimum 4', 'Maximum 6, minimum 4', 'Maximum 5, minimum 3'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "An internal node of order p can hold at most (p-1) search-key values, since between p tree pointers there are exactly (p-1) 'gaps' available for separator keys in the pointer-key-pointer-...-pointer layout. With p=7, the maximum is 7-1 = 6 keys. The minimum occupancy rule for a non-root internal node requires at least ceil(p/2) pointers, to keep the tree balanced and avoid excessive space waste; with p=7, that is ceil(7/2) = 4 pointers, which corresponds to (4-1) = 3 keys, since the number of keys in an internal node is always one less than its number of pointers. So a non-root internal node in this tree holds between 3 and 6 keys inclusive, matching option A. As with leaves, this minimum-occupancy floor is specifically relaxed for the root, which needs only 2 pointers (1 key) at minimum."
},
{
  id: 'dbms-indexing-x7',
  q: 'Block size = 2048 bytes, search-key size = 12 bytes, and block/tree-pointer size = 6 bytes. What is the maximum order (maximum number of tree pointers) of a B+-tree internal node?',
  options: ['113', '114', '115', '116'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "An internal node of order n has n pointers and (n-1) keys, and must fit within one block: n x (pointer size) + (n-1) x (key size) <= block size, i.e. n x 6 + (n-1) x 12 <= 2048. Solving the standard derived form n <= (block size + key size) / (pointer size + key size) gives n <= (2048 + 12) / (6 + 12) = 2060 / 18 = 114.44, and taking the floor gives n = 114. Verify by direct substitution: with n=114, the space used is 114 x 6 + 113 x 12 = 684 + 1356 = 2040 bytes, which fits within 2048 bytes. Checking the next integer, n=115, gives 115 x 6 + 114 x 12 = 690 + 1368 = 2058 bytes, which exceeds 2048 and does not fit. This confirms n=114 is indeed the maximum order, and re-substituting both the computed floor value and the next integer back into the raw inequality is the reliable way to avoid off-by-one errors on this kind of calculation."
},
{
  id: 'dbms-indexing-x8',
  q: 'Using the same block size 2048 bytes, key size 12 bytes, and pointer size 6 bytes (for both block pointers and record pointers), what is the maximum number of (key, record-pointer) pairs a single B+-tree leaf node can hold?',
  options: ['113', '114', '115', '112'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "A leaf node holds up to (n-1) key/record-pointer pairs plus one extra block pointer at the end for chaining to the next leaf, giving the space constraint (n-1) x (key size + record pointer size) + (block pointer size) <= block size. Substituting the derived formula n <= (block size - block pointer size + key size) / (key size + record pointer size) gives n <= (2048 - 6 + 12) / (12 + 6) = 2054 / 18 = 114.1, and flooring gives n = 114, meaning the leaf holds at most (n-1) = 113 key-record-pointer pairs. Verify directly: 113 pairs use 113 x (12+6) = 113 x 18 = 2034 bytes, plus the 6-byte chaining pointer, totaling 2040 bytes, which fits within 2048. Checking 114 pairs instead: 114 x 18 = 2052, plus 6 = 2058 bytes, which exceeds the 2048-byte block - confirming that 113 is indeed the maximum number of (key, record-pointer) pairs a leaf can hold."
},
{
  id: 'dbms-indexing-x9',
  q: 'A file has 100-byte records stored in a 2048-byte block, with no record spanning across blocks. What is the blocking factor (records per block), and how many blocks does a sorted file of 50,000 such records occupy?',
  options: ['Blocking factor 20; 2500 blocks', 'Blocking factor 20; 2000 blocks', 'Blocking factor 21; 2381 blocks', 'Blocking factor 20; 2450 blocks'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "The blocking factor is the number of whole records that fit in one block, computed as floor(block size / record size) since records cannot span blocks: floor(2048 / 100) = floor(20.48) = 20 records per block. To find the number of blocks needed for 50,000 records at 20 records per block, divide and round up (since a partially filled final block still counts as a full block): ceil(50000 / 20) = 2500 blocks exactly, since 50000 is an exact multiple of 20 (2500 x 20 = 50000 with no remainder, so no extra partial block is even needed). This matches option A. Options like 2000 or 2450 would result from arithmetic errors in either the blocking factor or the division, and option C's blocking factor of 21 incorrectly assumes records can be packed more densely than the block size actually allows (21 x 100 = 2100 bytes, which exceeds the 2048-byte block)."
},
{
  id: 'dbms-indexing-x10',
  q: 'A sorted data file occupies 2500 blocks (blocking factor 20). A sparse primary index has one entry per data block (16 bytes per entry), giving 2500 index entries stored with an index blocking factor of floor(2048/16) = 128 entries per index block. How many index blocks are needed, and what is the total number of block accesses for an exact-match search (binary search on the index, then read the target data block)?',
  options: ['20 index blocks; 6 total accesses', '25 index blocks; 5 total accesses', '20 index blocks; 5 total accesses', '18 index blocks; 6 total accesses'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Index blocks needed = ceil(2500 / 128). Since 128 x 19 = 2432 (short of 2500) and 128 x 20 = 2560 (enough), exactly 20 index blocks are required. A binary search over 20 index blocks takes ceil(log2(20)) probes: since 2^4 = 16 < 20 <= 32 = 2^5, this is ceil(4.32) = 5 block accesses to locate the correct index entry. That index entry then points directly to the target data block (since this is a sparse PRIMARY index over a sorted file - the record is guaranteed to be findable in that one block via an in-memory scan, with no further block access needed for that scan), contributing exactly 1 more access. Total block accesses = 5 (index binary search) + 1 (data block read) = 6. This matches option A; the other options either miscompute the index block count or omit the final data-block read from the total."
},
{
  id: 'dbms-indexing-x11',
  q: 'The same 50,000-record file, when unsorted with respect to a field Name, has a dense secondary index on Name: one entry per record (16 bytes each), blocked at 128 entries per index block. How many index blocks does this dense secondary index require, and how many block accesses does an exact-match lookup need (binary search on the index, plus one data-block fetch)?',
  options: ['391 index blocks; 10 total accesses', '391 index blocks; 9 total accesses', '400 index blocks; 10 total accesses', '391 index blocks; 11 total accesses'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "A dense index needs one entry per RECORD, not per block, so with 50,000 records: index blocks = ceil(50000 / 128). Since 128 x 390 = 49,920 (short of 50,000) and 128 x 391 = 50,048 (enough), exactly 391 index blocks are needed - far more than a sparse index would require on the same file, since density trades index size for the guaranteed ability to locate any record without relying on physical ordering. Binary search over 391 index blocks takes ceil(log2(391)) probes: since 2^8 = 256 < 391 <= 512 = 2^9, this is ceil(8.6) = 9 block accesses to find the matching index entry. That entry then points to the exact data block holding the record (which, since the file is unsorted on Name, could be anywhere), contributing 1 more access. Total = 9 + 1 = 10 block accesses, matching option A."
},
{
  id: 'dbms-indexing-x12',
  q: 'For a sorted file of 50,000 records with data blocking factor 20, compare a sparse index (one entry per block) against a dense index (one entry per record), both using 16-byte entries packed 128 per index block. How many index blocks does each require?',
  options: [
    'Sparse needs 20 blocks; dense needs 391 blocks - the sparse index is roughly 20 times smaller',
    'Sparse needs 391 blocks; dense needs 20 blocks',
    'Both need 391 blocks, since both index the same underlying file',
    'Sparse needs 2500 blocks; dense needs 50000 blocks'
  ],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "A sparse index needs only one entry per DATA BLOCK, not per record: with a data blocking factor of 20, there are 50000/20 = 2500 data blocks and hence 2500 sparse index entries, which pack into ceil(2500/128) = 20 index blocks. A dense index needs one entry per RECORD instead: 50000 entries, packing into ceil(50000/128) = 391 index blocks. So the sparse index occupies 20 index blocks versus the dense index's 391 - roughly a 20-fold reduction (391/20 is approximately 19.6), reflecting exactly the data blocking factor of 20 that separates the two counts, since a sparse index is smaller than an equivalent dense index by very close to that same blocking-factor ratio. This size advantage is precisely why sparse indexes are preferred whenever they are applicable (i.e., whenever the data file is physically sorted on the index's key), at the small added cost of an in-block scan after locating the sparse entry."
},
{
  id: 'dbms-indexing-x13',
  q: 'Which of the following correctly explains why a sparse index requires its data file to be physically sorted on the index search key, whereas a dense index has no such requirement?',
  options: [
    'A sparse index stores only one entry per block (or per group of identical values), so locating an unindexed value requires scanning forward within the target block from the nearest preceding entry - correct only if the file is sorted, guaranteeing that every value between two indexed entries physically lies between them; a dense index instead gives a direct pointer for every value, so no such positional guarantee is ever needed',
    'Sparse indexes are always smaller than dense ones no matter how the file is organized, which is why sorting is irrelevant to them',
    'It is actually the dense index that requires sorting, while the sparse index does not',
    'Neither a sparse index nor a dense index has any dependency on the physical sort order of the underlying data file'
  ],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: "A sparse index deliberately omits entries for most search-key values to save space, typically keeping just one entry per data block (pointing to that block's first record). Finding a value with no explicit entry means locating the nearest PRECEDING indexed entry and then scanning forward through the data block(s) from there - this procedure is only correct if the data file is physically sorted on that same search key, since sorting is what guarantees every value 'between' two consecutive index entries is physically stored between them on disk. Without that sort order, a sparse index could point to a starting position with no guarantee the target record is anywhere nearby. A dense index, in contrast, stores a direct pointer for every distinct search-key value (or every record), so it never needs to rely on any positional relationship between values, and works correctly regardless of how the underlying data file happens to be physically organized."
},
{
  id: 'dbms-indexing-x14',
  q: 'A B+-tree index has height 3 (root, one internal level, and the leaf level - 3 block accesses to reach the first qualifying leaf), with an average leaf occupancy of 100 records per leaf. A range query matches 850 qualifying records in total, retrieved by locating the first qualifying leaf via the tree and then following leaf-chain pointers for the rest. Approximately how many total block accesses are needed (assuming records are read directly from the leaf blocks, with no separate record-fetch step)?',
  options: ['9', '11', '12', '3'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Reaching the first qualifying leaf costs 3 block accesses (the tree's height), and that single access already reads the first leaf block, yielding up to 100 of the 850 qualifying records. The remaining qualifying records after that first leaf: 850 - 100 = 750. Each additional leaf block accessed via the leaf-chain linked list yields up to 100 more records, so the number of additional leaf blocks needed is ceil(750 / 100) = 8 (since 7 x 100 = 700 is short of 750, an 8th leaf block is required to cover the rest). Total block accesses = 3 (tree traversal down to and including the first leaf) + 8 (additional leaf blocks read via chaining) = 11. This calculation illustrates the core efficiency benefit of the B+-tree's linked leaf level for range queries: after paying the initial height-proportional cost once, every subsequent qualifying leaf costs just a single sequential access with no need to re-traverse the tree from the root."
}
);

window.GATE_DATA.questions['dbms'].topics.find(function(t){return t.id==='dbms-transactions';}).questions.push(
{
  id: 'dbms-transactions-x1',
  q: 'S1: R1(X), W2(X), R1(Y), W2(Y). S2: R1(X), R1(Y), W2(X), W2(Y). Are S1 and S2 conflict-equivalent?',
  options: [
    'Yes - the only conflicting operation pairs are (R1(X), W2(X)) and (R1(Y), W2(Y)), and both schedules order R1 before W2 in each case',
    'No, because the operations occur in a different overall physical sequence',
    'No, because W2(X) and W2(Y) both belong to the same transaction T2',
    'Cannot be determined without knowing the actual values read and written'
  ],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "Two schedules are conflict-equivalent if they contain the same operations and order every pair of CONFLICTING operations (same data item, different transactions, at least one a write) the same way - operations that never conflict are free to appear in a different relative order without affecting equivalence. Here the only conflicting pairs are on X (R1(X) versus W2(X)) and on Y (R1(Y) versus W2(Y)), since R1 and W2 belong to different transactions and touch the same items. In S1, R1(X) precedes W2(X) and R1(Y) precedes W2(Y). In S2, despite the different overall interleaving (both reads grouped before both writes), R1(X) still precedes W2(X) and R1(Y) still precedes W2(Y). Since every conflicting pair is ordered identically in both schedules, S1 and S2 are conflict-equivalent, even though their literal operation sequences differ - option B mistakes surface-level sequence differences for conflict differences."
},
{
  id: 'dbms-transactions-x2',
  q: 'S1: R1(X), W1(X), W2(X). S2: W2(X), R1(X), W1(X). Are S1 and S2 conflict-equivalent?',
  options: [
    'Yes, since both schedules contain exactly the same set of operations',
    'No - in S1, W1(X) precedes W2(X) and R1(X) precedes W2(X), but S2 reverses both of these conflicting pairs by placing W2(X) first',
    'Yes, because only read-write conflicts matter for conflict equivalence, not write-write conflicts',
    'Cannot be determined without more transactions'
  ],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "Conflict-equivalence requires the same relative order for every pair of conflicting operations - and write-write pairs on the same item by different transactions absolutely do conflict, contrary to option C's claim. In S1, the order is R1(X) then W1(X) then W2(X): the conflicting pair (R1(X), W2(X)) has R1 first, and the conflicting pair (W1(X), W2(X)) has W1 first. In S2, the order is W2(X) then R1(X) then W1(X): now W2(X) precedes BOTH R1(X) and W1(X) - both of the previously identified conflicting pairs are reversed. Since at least one conflicting pair's relative order differs between S1 and S2 (in fact both do here), the schedules are NOT conflict-equivalent. Having the same set of operations (option A) is a necessary but not sufficient condition for conflict-equivalence; the relative ordering of conflicts is what actually matters."
},
{
  id: 'dbms-transactions-x3',
  q: 'Schedule S has operations, in order: R1(X), W2(X), R2(Y), W3(Y), R3(X), W1(Y), across transactions T1, T2, T3. Build the precedence (serialization) graph and determine whether S is conflict-serializable.',
  options: [
    'Serializable; equivalent serial order T1, T2, T3',
    'Serializable; equivalent serial order T2, T3, T1',
    'Not serializable - the precedence graph contains the cycle T1 -> T2 -> T3 -> T1',
    'Not serializable, because T1 and T3 share no direct conflict, leaving the graph disconnected'
  ],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Scan the operations left to right and add an edge Ti -> Tj whenever Ti's operation on some item precedes a conflicting operation by Tj on the same item. On X: R1(X) precedes W2(X), giving T1 -> T2; later W2(X) precedes R3(X), giving T2 -> T3. On Y: R2(Y) precedes W3(Y), giving T2 -> T3 again (same edge); and R2(Y) also precedes the later W1(Y), giving T2 -> T1; finally W3(Y) precedes W1(Y), giving T3 -> T1. Collecting all edges: T1 -> T2, T2 -> T3, T3 -> T1 (plus a redundant T2 -> T1). Following T1 -> T2 -> T3 -> T1 traces a complete cycle through all three nodes. A precedence graph with any cycle means no consistent linear (serial) ordering of the transactions can reproduce the same conflict order, so S is NOT conflict-serializable - options A and B propose serial orders that cannot actually exist here."
},
{
  id: 'dbms-transactions-x4',
  q: 'Schedule S has operations, in order: R1(A), W2(A), R3(A), R1(B), W3(B), across transactions T1, T2, T3. Build the precedence graph and determine a conflict-equivalent serial order, if one exists.',
  options: [
    'Not serializable - cycle T1 -> T2 -> T3 -> T1',
    'Serializable; the edges T1 -> T2, T2 -> T3, and T1 -> T3 form a directed acyclic graph, giving the equivalent serial order T1, T2, T3',
    'Serializable; equivalent order T3, T2, T1',
    'Not serializable, since T1 conflicts with both T2 (on A) and T3 (on B) simultaneously'
  ],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Track conflicts item by item. On A: R1(A) precedes W2(A), giving edge T1 -> T2; later W2(A) precedes R3(A), giving edge T2 -> T3. On B: R1(B) precedes W3(B), giving edge T1 -> T3. The complete edge set is {T1 -> T2, T2 -> T3, T1 -> T3} - no edge points back into T1 from either T2 or T3, so there is no cycle; this is a valid directed acyclic graph (DAG). A topological sort of this DAG must place T1 first (it has no incoming edges), then T2 (its only incoming edge is from the already-placed T1), then T3 last. This gives the unique consistent serial order T1, T2, T3, confirming S is conflict-serializable and equivalent to executing the three transactions one after another in exactly that order, with no interleaving."
},
{
  id: 'dbms-transactions-x5',
  q: 'T1 consists of R1(A), W1(A) and T2 consists of R2(A), W2(A), both operating on the same data item A. Considering all interleavings that preserve each transaction\'s own internal operation order, there are C(4,2) = 6 total possible schedules. How many of these 6 interleavings are conflict-serializable?',
  options: ['2', '3', '4', '6'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Enumerate all 6 interleavings and check each for a cycle between T1 and T2 (the only two transactions, so a cycle can only be the trivial two-node cycle T1->T2 plus T2->T1 both present). (1) R1,W1,R2,W2: every conflicting pair (R1-W2, W1-R2, W1-W2) is ordered T1-before-T2 - only edge T1->T2, serializable as T1,T2. (2) R1,R2,W1,W2: R1 before W2 gives T1->T2, but R2 before W1 gives T2->T1 - both directions present, a cycle, NOT serializable. (3) R1,R2,W2,W1: similarly both T1->T2 (R1-W2) and T2->T1 (R2-W1, W2-W1) appear - NOT serializable. (4) R2,R1,W1,W2: both directions again - NOT serializable. (5) R2,R1,W2,W1: both directions again - NOT serializable. (6) R2,W2,R1,W1: every conflicting pair is ordered T2-before-T1 - only edge T2->T1, serializable as T2,T1. Only schedules (1) and (6), where one transaction's read AND write both fully precede the other's, avoid a cycle - exactly 2 out of the 6 total interleavings are conflict-serializable."
},
{
  id: 'dbms-transactions-x6',
  q: 'Transaction T1 acquires: lock(A) at time 1, lock(B) at time 3, unlock(A) at time 5, unlock(B) at time 8. Transaction T2 acquires: lock(C) at time 2, unlock(C) at time 4, lock(D) at time 6, unlock(D) at time 9. Which transaction(s) satisfy two-phase locking (2PL), and what is T1\'s lock point?',
  options: [
    'T1 is 2PL-compliant with lock point at time 3 (its last lock acquisition, before any release); T2 violates 2PL because it acquires lock(D) at time 6 after already releasing lock(C) at time 4',
    'Both T1 and T2 are 2PL-compliant',
    'Neither T1 nor T2 is 2PL-compliant',
    'T2 is 2PL-compliant and T1 is not'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Two-phase locking requires every lock acquisition to occur before the FIRST lock release (the growing phase), after which only releases may occur (the shrinking phase) - once a transaction releases even one lock, it may never acquire another. For T1: locks are acquired at times 1 and 3, and the first release happens at time 5 - both acquisitions occur strictly before the first release, so T1 is 2PL-compliant, with its lock point (the moment it holds its maximum number of locks, marking the growing-to-shrinking transition) at time 3, when lock(B) is acquired. For T2: it acquires lock(C) at time 2, releases it at time 4, and then acquires lock(D) at time 6 - this acquisition at time 6 happens AFTER a release at time 4, directly violating the two-phase rule (once shrinking begins, no more growing is allowed). So T2 is not 2PL-compliant, while T1 is."
},
{
  id: 'dbms-transactions-x7',
  q: 'Data item Q has R-timestamp(Q) = 10 and W-timestamp(Q) = 12. Transaction T with TS(T) = 11 requests a READ on Q. Under the basic timestamp-ordering protocol, what happens?',
  options: [
    'The read proceeds and R-timestamp(Q) is updated to max(10, 11) = 11',
    'The read is rejected and T is rolled back, since TS(T) = 11 is less than W-timestamp(Q) = 12',
    'The read proceeds because TS(T) = 11 is greater than R-timestamp(Q) = 10',
    'The read is silently ignored, but T is allowed to continue'
  ],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "The basic timestamp-ordering READ rule rejects (rolls back) T's read of Q whenever TS(T) is less than W-timestamp(Q), because that would mean T is trying to read Q as of a point in time BEFORE some other, 'younger' transaction already overwrote it - reading now would produce a value inconsistent with the timestamp order the protocol enforces, since a properly time-ordered execution would have had T's read happen before that later write, not after. Here TS(T) = 11 is indeed less than W-timestamp(Q) = 12, so the read is rejected outright and T must be rolled back and restarted with a fresh, larger timestamp. Note that TS(T) being greater than R-timestamp(Q) (option C's reasoning) is irrelevant to the READ rule - R-timestamp(Q) only gets compared against timestamps of transactions requesting to WRITE Q, never against another transaction's own read request."
},
{
  id: 'dbms-transactions-x8',
  q: 'Data item Q has W-timestamp(Q) = 15 and R-timestamp(Q) = 8. Transaction T with TS(T) = 10 requests a WRITE on Q. Under the Thomas Write Rule (a modification of basic timestamp ordering), what happens?',
  options: [
    'T is rolled back immediately, since TS(T) = 10 is less than W-timestamp(Q) = 15',
    'The write is simply ignored (not physically performed), but T is allowed to continue normally, since TS(T) = 10 is not less than R-timestamp(Q) = 8, so no read has been violated - this is exactly the optimization the Thomas Write Rule adds over basic timestamp ordering',
    'The write proceeds normally and W-timestamp(Q) is updated to 10',
    'The write proceeds, and every transaction with a timestamp greater than 10 is rolled back'
  ],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "First check the rule that Thomas Write Rule shares with basic TO: if TS(T) < R-timestamp(Q), the write must be rejected outright, because some transaction has already read a version of Q that this write would have needed to precede - here TS(T) = 10 is NOT less than R-timestamp(Q) = 8, so this rejection does not trigger. Next, under BASIC timestamp ordering, the check TS(T) < W-timestamp(Q) (10 < 15, true) would normally also force a rollback. The Thomas Write Rule specifically relaxes exactly this second case: since no read has been compromised (the first check already passed), the obsolete write is simply IGNORED - not physically applied, and W-timestamp(Q) is left unchanged at 15 - while T is allowed to proceed as if the write had happened, without being aborted. This 'ignore obsolete writes' optimization is the entire point of the Thomas Write Rule, and it can validate certain schedules as serializable that basic TO would needlessly abort."
},
{
  id: 'dbms-transactions-x9',
  q: 'Schedule S: R1(A), W1(A), R2(A), W2(A), C2, C1 - that is, T2 commits before T1 does, even though T2 read the value of A that T1 had written while T1 was still active (uncommitted). How should this schedule be classified with respect to recoverability?',
  options: [
    'Recoverable',
    'Not recoverable, because T2 reads a value written by T1 and commits (C2) before T1 commits (C1)',
    'Cascadeless',
    'Strict'
  ],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "A schedule is recoverable only if, whenever a transaction Tj reads a data item previously written by another transaction Ti, Tj's commit is delayed until AFTER Ti's commit - this guarantees that if Ti ends up aborting, Tj (which has not yet committed) can still be aborted too, undoing the effect of having read Ti's now-invalid data. In this schedule, T2 reads A at position R2(A) after T1's write W1(A) but before T1 has committed (T1's commit C1 comes last, after C2). T2 then commits at C2, which occurs BEFORE T1's commit C1. This violates the recoverability requirement directly: T2 has irrevocably committed based on data from T1, while T1's fate (commit or abort) is still undecided. If T1 were to abort after this point, there would be no way to undo T2's already-committed changes, producing a permanently inconsistent database - so this schedule is classified as NOT recoverable, and is therefore also neither cascadeless nor strict (both stronger properties)."
},
{
  id: 'dbms-transactions-x10',
  q: 'Schedule S: R1(A), W1(A), R2(A), W2(A), C1, C2. Classify this schedule with respect to recoverability.',
  options: [
    'Recoverable, but not cascadeless - T2 reads A after W1(A) but before C1 (a dirty read of uncommitted data), even though T1 happens to commit before T2 does in this particular execution',
    'Not recoverable, since T2 read data that T1 had not yet committed',
    'Strict, since all writes to A only become visible after a commit',
    'Cascadeless, since only a single dirty read occurs in the whole schedule'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "Check recoverability first: T2 reads A (written by T1) at R2(A), and T2's commit C2 occurs after T1's commit C1 - this satisfies the recoverability requirement (the transaction that read another's uncommitted data commits only after that other transaction commits), so the schedule IS recoverable. But cascadelessness is a stricter, purely SYNTACTIC condition: a schedule is cascadeless only if every transaction reads exclusively values written by ALREADY-COMMITTED transactions - no dirty reads are permitted at all, regardless of what happens afterward. Here R2(A) occurs immediately after W1(A) but well before C1, meaning T2 read A while T1 was still uncommitted - a dirty read. Had T1 aborted instead of committing, T2 would have been forced to cascade-abort as well. The fact that T1 happened to commit successfully in this particular execution does not retroactively make the schedule cascadeless; the classification is based on the schedule's structure, not its eventual outcome. So S is recoverable but not cascadeless (and hence also not strict, since strict implies cascadeless)."
},
{
  id: 'dbms-transactions-x11',
  q: 'Schedule S: R1(A), W1(A), C1, R2(A), W2(A), C2. Classify this schedule with respect to recoverability, cascadelessness, and strictness.',
  options: [
    'Recoverable only',
    'Recoverable and cascadeless, but not strict',
    'Strict (and therefore also cascadeless and recoverable), since every access to A by T2 - both its read and its write - occurs only after T1\'s commit',
    'Not recoverable'
  ],
  answer: 2,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: "T2's operations on A - both R2(A) and W2(A) - occur strictly after T1's commit C1, with no access to A by T2 happening while T1 was still active. This satisfies the strongest of the three standard properties, strictness: a schedule is strict if no transaction reads OR writes an item until any transaction that previously wrote it has either committed or aborted. Since strictness is the strongest property in the hierarchy (strict implies cascadeless implies recoverable, but not conversely), and it holds here, all three properties automatically hold: the schedule is strict, hence also cascadeless (no dirty reads are possible, since access only happens post-commit) and recoverable (commits are trivially ordered correctly, since T2 could not even read T1's data before T1 committed). This is the ideal, safest case: T1's changes to A are only made visible to T2 once T1's outcome (commit) is finalized, eliminating any possibility of cascading rollback or unrecoverable state."
},
{
  id: 'dbms-transactions-x12',
  q: 'A precedence graph for three transactions T1, T2, T3 has exactly two edges: T1 -> T2 and T1 -> T3 (there is no edge between T2 and T3, meaning they never conflict with each other). How many distinct serial orders are conflict-equivalent to the original schedule, i.e., how many topological sorts does this graph admit?',
  options: ['1', '2', '3', '6'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "A topological sort of a precedence graph is a linear ordering of the transactions consistent with every directed edge (the source must come before the target). Since T1 has edges pointing to both T2 and T3, and nothing points to T1, T1 must appear FIRST in any valid topological sort - there is no flexibility there. Since there is no edge in either direction between T2 and T3, their relative order is completely unconstrained: they can appear as T2-then-T3 or T3-then-T2, and either choice is consistent with the graph (T1 -> T2 and T1 -> T3 are satisfied either way, since T1 already precedes both). This gives exactly 2 valid topological sorts: (T1, T2, T3) and (T1, T3, T2). Both are legitimate conflict-equivalent serial orders for any schedule whose precedence graph looks like this - a reminder that a serializable schedule does not always correspond to a UNIQUE equivalent serial order when the precedence graph is not a straight-line total order."
},
{
  id: 'dbms-transactions-x13',
  q: 'Under basic timestamp ordering, item Q starts with R-timestamp(Q) = 0 and W-timestamp(Q) = 0. Three operations arrive in this order: W3(Q) with TS(T3) = 15, then W1(Q) with TS(T1) = 5, then R2(Q) with TS(T2) = 10. How many of these three operations are rejected (rolled back)?',
  options: ['0', '1', '2', '3'],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Process operations in arrival order, updating timestamps only when an operation actually succeeds. (1) W3(Q), TS=15: the write rule rejects only if TS(T) < R-timestamp(Q) or TS(T) < W-timestamp(Q); both are currently 0, and 15 is less than neither, so the write PROCEEDS, updating W-timestamp(Q) to 15 (R-timestamp(Q) stays 0). (2) W1(Q), TS=5: check 5 < R-timestamp(Q)=0? No. Check 5 < W-timestamp(Q)=15? Yes - the write is REJECTED and T1 is rolled back; W-timestamp(Q) remains unchanged at 15 since the rejected write is never applied. (3) R2(Q), TS=10: the read rule rejects if TS(T) < W-timestamp(Q); W-timestamp(Q) is still 15 (T1's write never took effect), and 10 < 15, so this read is also REJECTED and T2 is rolled back. Final tally: only T3's write succeeded; both T1's write and T2's read were rejected - exactly 2 of the 3 operations are rolled back."
},
{
  id: 'dbms-transactions-x14',
  q: 'Which of the following is guaranteed by STRICT two-phase locking (Strict 2PL) that plain (basic) two-phase locking does not necessarily guarantee?',
  options: [
    'Conflict-serializability of the resulting schedule',
    'Freedom from deadlock',
    'Strictness of the schedule (and hence also cascadelessness and recoverability), since Strict 2PL holds all exclusive locks until the transaction commits or aborts, preventing any other transaction from reading or overwriting an item until then',
    'Freedom from transaction starvation'
  ],
  answer: 2,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Both basic 2PL and Strict 2PL guarantee conflict-serializability (option A) purely from the two-phase lock discipline itself, and neither variant prevents deadlock or starvation (options B and D) - those require separate detection/prevention mechanisms layered on top, regardless of which locking discipline is used underneath. The distinguishing feature of STRICT 2PL specifically is holding all EXCLUSIVE (write) locks until the transaction actually commits or aborts, rather than releasing them as soon as the shrinking phase begins as basic 2PL permits. This guarantees that no other transaction can read or overwrite a data item that some transaction has written until that writer's fate (commit or abort) is finally decided - which is precisely the definition of a strict schedule. Since strict schedules are automatically cascadeless (no dirty reads are ever possible) and automatically recoverable (strict implies both), Strict 2PL delivers all three properties as a direct consequence of its stricter lock-holding policy, which basic 2PL alone does not ensure."
}
);

window.GATE_DATA.questions['dbms'].topics.find(function(t){return t.id==='dbms-er';}).questions.push(
{
  id: 'dbms-er-y1',
  q: 'Relation R(A,B,C,D) has {A,B} as its ONLY candidate key. Which of the following statements are TRUE? (Select ALL that apply)',
  options: [
    '{A,B,C} is a superkey of R',
    '{A,B} is the only candidate key of R',
    '{A} is a candidate key of R',
    'R has exactly 4 superkeys in total'
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is true: any superset of a candidate key is a superkey, and {A,B,C} contains {A,B}. Option B is true by the problem statement itself - it directly tells us {A,B} is the unique candidate key, so no other minimal unique set exists. Option C is false: if {A} alone were a candidate key it would be a proper subset of {A,B} that is already unique, contradicting the given minimality of {A,B} as THE candidate key - the problem explicitly rules out any smaller unique set. Option D is true by direct counting: every superkey must contain the candidate key {A,B}, and the remaining attributes {C,D} are free to be present or absent, giving 2^(4-2) = 2^2 = 4 superkeys: {A,B}, {A,B,C}, {A,B,D}, {A,B,C,D}.'
},
{
  id: 'dbms-er-y2',
  q: 'Which of the following statements about weak entity sets and M:N relationships in ER-to-relational mapping are TRUE? (Select ALL that apply)',
  options: [
    'A weak entity set must have total participation in its identifying relationship',
    'The primary key of the table representing a weak entity set includes the primary key of its owner entity set',
    'A weak entity set can have a candidate key derived purely from its own attributes',
    'Every M:N relationship set requires a separate table in the relational mapping'
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is true: a weak entity exists only in the context of its owner, so it must appear in the identifying relationship - this is precisely total participation, always. Option B is true: because the discriminator (partial key) only distinguishes weak entities sharing the same owner, the full key of the mapped table must be the owner primary key concatenated with the discriminator. Option C is false and contradicts the very definition of a weak entity: if it had its own candidate key it would qualify as a strong entity set instead. Option D is true: an M:N relationship can never be folded into either participating entity table because neither side can hold a single-valued foreign key for a many-valued association in both directions, so a dedicated junction table is always mandatory, regardless of participation constraints.'
},
{
  id: 'dbms-er-y3',
  q: 'Which of the following statements about relational model integrity constraints are TRUE? (Select ALL that apply)',
  options: [
    'A NULL value is permitted in a foreign key attribute unless it is explicitly declared NOT NULL',
    'Referential integrity requires every non-NULL foreign key value to match some primary key value in the referenced relation',
    'The primary key of a relation may contain a NULL value if the relation happens to have only one candidate key',
    'Every relation has at least one superkey, namely the set of all its attributes'
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'easy',
  type: 'concept',
  explanation: 'Option A is true: unlike primary key attributes, a foreign key attribute is permitted to be NULL (meaning "no reference") unless the schema designer adds an explicit NOT NULL constraint on it. Option B is true and is exactly the statement of referential integrity - it applies to non-NULL foreign key values, since a NULL foreign key represents the absence of a reference and is exempt from the match requirement. Option C is false: entity integrity forbids NULL in ANY primary key attribute unconditionally - this rule does not relax even if the primary key is the relation\'s only candidate key; in fact having only one candidate key makes the NULL prohibition more critical, not less, since there is no alternate key to fall back on for identification. Option D is true: since a relation is a set of tuples, no two tuples can be identical, so the full attribute set always uniquely identifies every tuple and is therefore always a superkey (from which at least one minimal candidate key can be extracted).'
},
{
  id: 'dbms-er-y4',
  q: 'Relation R has attributes {A,B,C,D} and exactly two candidate keys: {A} and {B,C}. Using inclusion-exclusion over their supersets, compute the total number of superkeys of R. (Enter your numerical answer.)',
  options: [],
  answer: 10,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Superkeys containing {A}: the remaining attributes {B,C,D} (3 attributes) are each free to include or exclude, giving 2^3 = 8 superkeys. Superkeys containing {B,C}: the remaining attributes {A,D} (2 attributes) are free, giving 2^2 = 4 superkeys. Superkeys containing BOTH {A} and {B,C}, i.e. containing {A,B,C}: the remaining attribute {D} (1 attribute) is free, giving 2^1 = 2 superkeys. By inclusion-exclusion, total distinct superkeys = 8 + 4 - 2 = 10.'
},
{
  id: 'dbms-er-y5',
  q: 'An ER design has: strong entity sets Employee and Department; an M:N relationship WorksIn between Employee and Department; a 1:1 relationship Manages between Department and Employee in which Department participates totally (every department has exactly one manager) and Employee participates partially; and a weak entity set Dependent owned by Employee via an identifying relationship. What is the minimum number of tables needed in the relational mapping? (Enter your numerical answer.)',
  options: [],
  answer: 4,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Count table by table. (1) Employee gets its own table (strong entity). (2) Department gets its own table (strong entity). That is 2 so far. (3) WorksIn is M:N, so it mandatorily gets its own junction table holding (Eno, Dno) - 3 so far. (4) Manages is 1:1 with Department participating totally, so it is folded into the Department table as a NOT NULL manager-employee foreign key - no new table needed, still 3. (5) Dependent is a weak entity owned by Employee, so it gets its own table containing the Employee owner key plus the discriminator - this adds 1 more table, bringing the total to 4. Hence the minimum is 4 tables: Employee, Department (with embedded manager FK), WorksIn, and Dependent.'
},
{
  id: 'dbms-er-y6',
  q: 'Relation R has attributes {W,X,Y,Z} and exactly two candidate keys: {W,X} and {W,Y}. Using inclusion-exclusion over their supersets, compute the total number of superkeys of R. (Enter your numerical answer.)',
  options: [],
  answer: 6,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Superkeys containing {W,X}: the remaining attributes {Y,Z} (2 attributes) are free, giving 2^2 = 4 superkeys. Superkeys containing {W,Y}: the remaining attributes {X,Z} (2 attributes) are free, giving 2^2 = 4 superkeys. Superkeys containing both {W,X} and {W,Y} at once, i.e. containing {W,X,Y}: the remaining attribute {Z} (1 attribute) is free, giving 2^1 = 2 superkeys. By inclusion-exclusion, total distinct superkeys = 4 + 4 - 2 = 6.'
}
);

window.GATE_DATA.questions['dbms'].topics.find(function(t){return t.id==='dbms-ra-sql';}).questions.push(
{
  id: 'dbms-ra-sql-y1',
  q: 'Which of the following statements about relational algebra operators are TRUE? (Select ALL that apply)',
  options: [
    'The natural join operator is commutative: R ⋈ S produces the same set of tuples as S ⋈ R (up to attribute ordering)',
    'Selection distributes over union: σₚ(R ∪ S) = σₚ(R) ∪ σₚ(S), provided R and S are union-compatible',
    'Projection is idempotent: πₗ(πₗ(R)) = πₗ(R) for the same attribute list L',
    'The Cartesian product R × S is defined only when R and S have identical schemas'
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is true: natural join matches tuples on common attributes and the matching condition is symmetric in R and S, so the resulting tuple set is identical regardless of order (only column order in the output may differ). Option B is true: since union requires R and S to be union-compatible (same arity/domains), applying the same predicate p to each operand before or after the union selects exactly the same rows, so selection distributes over union. Option C is true: once a projection onto attribute list L has been performed, the result already contains only the columns in L, so projecting onto L again changes nothing - projection is idempotent. Option D is false: Cartesian product is defined for ANY two relations regardless of their schemas (it simply pairs every tuple of R with every tuple of S); the only practical requirement is that the two relations should not share attribute names to avoid ambiguity in the result, not that their schemas be identical.'
},
{
  id: 'dbms-ra-sql-y2',
  q: 'Which of the following statements about SQL semantics are TRUE? (Select ALL that apply)',
  options: [
    'In SQL, comparing any value to NULL using = yields UNKNOWN, never TRUE or FALSE',
    'A LEFT OUTER JOIN preserves every row of the left table even when there is no matching row in the right table, padding the right-table columns with NULL',
    'GROUP BY treats all NULL values appearing in the grouping column as belonging to a single group',
    'The WHERE clause can filter rows based on the result of an aggregate function such as COUNT(*) or SUM(x)'
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is true: SQL uses three-valued logic, and any comparison involving NULL (including x = NULL) evaluates to UNKNOWN rather than TRUE or FALSE, which is why "= NULL" never matches rows (IS NULL must be used instead). Option B is true: this is the defining behavior of LEFT OUTER JOIN - unmatched left rows are still included in the output, with NULLs filling every right-table column. Option C is true: although two NULLs are never considered "equal" for comparison purposes, the SQL standard specifically groups all NULLs in the GROUP BY column(s) together into one group, treating them as indistinguishable for grouping purposes. Option D is false: aggregate functions are computed only after WHERE has already filtered rows and GROUP BY has formed groups, so WHERE cannot reference aggregate results - that filtering must be done in the HAVING clause instead.'
},
{
  id: 'dbms-ra-sql-y3',
  q: 'Which of the following statements about SQL set operations and subqueries are TRUE? (Select ALL that apply)',
  options: [
    'UNION automatically removes duplicate rows from the combined result, while UNION ALL retains all duplicates',
    'INTERSECT returns the rows common to both queries, treating two NULLs as matching for the purpose of determining duplicate/common rows',
    'A correlated subquery is evaluated exactly once for the entire outer query, independent of the current outer row',
    'EXISTS returns TRUE as soon as the subquery produces at least one row, regardless of whether that row itself contains NULL values'
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is true: this is the defining distinction between the two operators - UNION performs duplicate elimination on the combined set, whereas UNION ALL simply concatenates all rows from both queries. Option B is true: for the specific purpose of row comparison in set operations (UNION/INTERSECT/EXCEPT), the SQL standard treats two NULLs in the same column position as matching, unlike ordinary WHERE-clause comparisons where NULL = NULL is UNKNOWN. Option C is false: a correlated subquery references a column from the outer query, so it must be conceptually re-evaluated once per outer row (using that row\'s values) rather than once for the whole query - this is exactly what distinguishes it from an uncorrelated subquery. Option D is true: EXISTS only checks for the presence of at least one returned row; it does not inspect the contents of that row, so even a row consisting entirely of NULLs still makes EXISTS evaluate to TRUE.'
},
{
  id: 'dbms-ra-sql-y4',
  q: 'Consider relations R(A,B) = {(1,10),(1,20),(2,10),(3,30)} and S(B,C) = {(10,100),(10,200),(20,300),(40,400)}. How many tuples are in the result of R ⋈ S (natural join on attribute B)? (Enter your numerical answer.)',
  options: [],
  answer: 5,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Match each tuple of R with tuples of S sharing the same B value. (1,10) matches S-tuples with B=10: (10,100) and (10,200) -> gives (1,10,100) and (1,10,200), 2 result tuples. (1,20) matches S-tuple (20,300) -> gives (1,20,300), 1 result tuple. (2,10) matches both B=10 tuples in S -> gives (2,10,100) and (2,10,200), 2 result tuples. (3,30) has B=30, which does not appear in S at all (S has B values 10,10,20,40) -> 0 result tuples. Total tuples = 2 + 1 + 2 + 0 = 5.'
},
{
  id: 'dbms-ra-sql-y5',
  q: 'Using the same relations R(A,B) = {(1,10),(1,20),(2,10),(3,30)} and S(B,C) = {(10,100),(10,200),(20,300),(40,400)} from the natural join R ⋈ S, how many rows satisfy R.A, S.C with S.C > 150 in the query "SELECT R.A, S.C FROM R, S WHERE R.B = S.B AND S.C > 150"? (Enter your numerical answer.)',
  options: [],
  answer: 3,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'First compute R ⋈ S as in the previous question: (1,10,100), (1,10,200), (1,20,300), (2,10,100), (2,10,200) - 5 tuples total. Now apply the filter C > 150 on each: (1,10,100) has C=100, fails. (1,10,200) has C=200, passes. (1,20,300) has C=300, passes. (2,10,100) has C=100, fails. (2,10,200) has C=200, passes. Exactly 3 tuples pass the filter: (1,200), (1,300), (2,200) as (A,C) pairs. So the query returns 3 rows.'
},
{
  id: 'dbms-ra-sql-y6',
  q: 'Let R(A,B) = {(1,10),(1,20),(2,10),(3,30)} and T(B) = {(10),(20)}. How many tuples are in R ÷ T (relational division of R by T)? (Enter your numerical answer.)',
  options: [],
  answer: 1,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'R ÷ T contains every A-value such that, for ALL B-values in T, the pair (A,B) appears in R. Group R by A: A=1 has B-values {10,20} - this set contains both required B-values {10,20} from T, so A=1 qualifies. A=2 has B-values {10} only - it is missing B=20 from T, so A=2 does not qualify. A=3 has B-values {30} - missing both required values, so A=3 does not qualify. Hence R ÷ T = {(1)}, which contains exactly 1 tuple.'
}
);

window.GATE_DATA.questions['dbms'].topics.find(function(t){return t.id==='dbms-normalization';}).questions.push(
{
  id: 'dbms-normalization-y1',
  q: 'Which of the following statements about normal forms are TRUE? (Select ALL that apply)',
  options: [
    'BCNF is strictly more restrictive than 3NF, so a relation in 3NF need not be in BCNF',
    'A relation with a single-attribute candidate key is automatically free of partial-dependency (2NF) violations',
    'Every relation that is in 3NF is also automatically in BCNF',
    'Multivalued dependency issues (4NF violations) can exist even in a relation that already satisfies BCNF'
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is true: the normal form hierarchy is BCNF ⊆ 3NF, meaning every BCNF relation is in 3NF but the converse need not hold - there exist relations satisfying 3NF that still violate the stricter BCNF condition. Option B is true: a partial dependency requires a non-prime attribute to depend on a PROPER SUBSET of a composite candidate key; if the only candidate key is a single attribute, it has no proper non-empty subset to depend on, so partial dependency (hence 2NF violation) is structurally impossible. Option C is false: this reverses the correct containment - BCNF implies 3NF, not the other way around; a relation can satisfy 3NF (via its exception clause for prime attributes) while still having a non-superkey determinant, which violates BCNF. Option D is true: BCNF only addresses functional dependencies; multivalued dependencies are a separate, stronger constraint handled at 4NF, so a relation can be fully in BCNF and still contain a multivalued dependency that causes redundancy, requiring further decomposition to reach 4NF.'
},
{
  id: 'dbms-normalization-y2',
  q: 'Which of the following statements about lossless-join and dependency-preserving decomposition are TRUE? (Select ALL that apply)',
  options: [
    'A decomposition of R into R1 and R2 is lossless-join if and only if the common attributes (R1 ∩ R2) form a superkey of at least one of R1 or R2',
    'A BCNF decomposition is always guaranteed to preserve every functional dependency of the original relation',
    'The 3NF synthesis algorithm guarantees both a lossless-join and a dependency-preserving decomposition',
    'Any decomposition of a relation into two sub-relations is automatically lossless-join'
  ],
  answers: [0, 2],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: 'Option A is true: this is precisely the standard lossless-join test for a binary decomposition - if (R1 ∩ R2) → R1 or (R1 ∩ R2) → R2 holds (i.e. the shared attributes functionally determine one of the two pieces), then joining R1 and R2 back together reconstructs exactly the original relation with no spurious tuples. Option B is false: it is a well-known limitation that decomposing into BCNF can force the loss of some functional dependencies (they can no longer be checked without an expensive join), which is precisely why 3NF is sometimes preferred as a compromise that always preserves dependencies. Option C is true: the classical 3NF synthesis algorithm (built from a minimal cover of the FDs) is specifically designed to guarantee both properties simultaneously - lossless-join (by including a key of the original relation as one of the sub-schemas) and dependency preservation (by construction, since each FD from the minimal cover is preserved in some sub-schema). Option D is false: a decomposition is lossless only under the specific condition in option A; an arbitrary split of attributes into two sets can easily fail this condition and produce spurious tuples on rejoining.'
},
{
  id: 'dbms-normalization-y3',
  q: 'Which of the following statements about functional dependencies and Armstrong\'s axioms are TRUE? (Select ALL that apply)',
  options: [
    'Armstrong\'s axioms (reflexivity, augmentation, transitivity) are sound and complete for functional dependency inference',
    'If X → Y and X → Z both hold, then X → YZ also holds (the union rule)',
    'If X → Y holds, then XC → Y does NOT necessarily hold for an arbitrary attribute set C',
    'A functional dependency X → Y is called trivial if Y is a subset of X'
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is true: Armstrong\'s axioms are a foundational result in relational theory - sound (they only derive FDs that truly hold) and complete (every FD that logically follows from a given set can be derived using just these three rules, possibly combined into derived rules like union, decomposition, and pseudo-transitivity). Option B is true: this is exactly the derived union rule - from X → Y, augmentation gives X → XY, and from X → Z, augmentation and transitivity combine to yield X → YZ; it is a standard, provable consequence of the axioms. Option C is false: augmentation states that X → Y implies XC → YC for any C, and then the decomposition rule (itself derivable from the axioms) reduces XC → YC to XC → Y - so XC → Y is ALWAYS guaranteed to hold whenever X → Y holds, regardless of what C is. Option D is true: this is the standard definition of a trivial functional dependency - if Y ⊆ X, then X → Y holds automatically in every possible relation instance (a tuple\'s own values obviously determine any subset of themselves), carrying no real informational constraint.'
},
{
  id: 'dbms-normalization-y4',
  q: 'Relation R(A,B,C,D) has functional dependencies AB → C, AB → D, and C → A. How many candidate keys does R have? (Enter your numerical answer.)',
  options: [],
  answer: 2,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Compute closures to find minimal keys. (AB)+: start {A,B}; AB → C adds C giving {A,B,C}; AB → D adds D giving {A,B,C,D} = all attributes, so AB is a superkey. Check minimality: A+ = {A} (no FD fires with just A) and B+ = {B}, neither is a superkey alone, so AB is minimal -> AB is a candidate key. Now test BC: (BC)+: start {B,C}; C → A adds A giving {A,B,C}; now AB → C (C already present) and AB → D fires since A,B both present, adding D, giving {A,B,C,D} = all attributes, so BC is also a superkey. Check minimality: B+ = {B} and C+ = {A,C} (via C→A only), neither is a superkey alone, so BC is minimal -> BC is also a candidate key. Check remaining pairs: AC+ = {A,C} (C→A adds nothing new, AB→C/D cannot fire without B) - not a superkey. AD+, BD+, CD+ similarly fail to reach all four attributes. No single attribute alone is a superkey either. Hence there are exactly 2 candidate keys: {A,B} and {B,C}.'
},
{
  id: 'dbms-normalization-y5',
  q: 'Relation R(A,B,C) has functional dependencies A → B, B → C, and C → A (a cyclic set of dependencies). How many candidate keys does R have? (Enter your numerical answer.)',
  options: [],
  answer: 3,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Compute the closure of each single attribute. A+: start {A}; A → B adds B giving {A,B}; B → C adds C giving {A,B,C} = all attributes, so {A} is a superkey, and being a single attribute it is trivially minimal -> {A} is a candidate key. B+: start {B}; B → C adds C giving {B,C}; C → A adds A giving {A,B,C} = all attributes, so {B} is also a candidate key by the same minimality argument. C+: start {C}; C → A adds A giving {A,C}; A → B adds B giving {A,B,C} = all attributes, so {C} is also a candidate key. Since each of the three single attributes individually closes to all attributes, and no proper (empty) subset of a single attribute can be a key, all three singleton sets {A}, {B}, {C} are minimal superkeys. Hence R has exactly 3 candidate keys.'
},
{
  id: 'dbms-normalization-y6',
  q: 'Relation R(A,B,C,D) has candidate key A (i.e. A is the only key) and functional dependencies A → B, A → C, and C → D. Since C → D violates BCNF (C is not a superkey of R), R is decomposed by removing D from the attributes determined transitively: R1(C,D) and R2(A,B,C). How many relations result from this BCNF decomposition in total? (Enter your numerical answer.)',
  options: [],
  answer: 2,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Identify the BCNF violation: A is the sole candidate key of R (A+ = {A,B,C,D} using A→B, A→C, then C→D), so any determinant other than a superset of A violates BCNF. Here C → D has C+ = {C,D} (via C→D only), which is not a superkey of R (it does not include A or B) - so this FD violates BCNF and must be removed by decomposition. Standard BCNF decomposition: split off R1 with the violating dependency\'s closure, R1(C,D) (attributes in C+), and R2 with the remaining attributes plus the determinant, R2(A,B,C) (all attributes minus D). Now check each piece: R1(C,D) has FD C→D with C as its own key - BCNF satisfied, trivially. R2(A,B,C) has FDs A→B, A→C with A as key, and A+ within R2 covers all of R2\'s attributes - BCNF satisfied. No further violations remain, so the decomposition terminates with exactly 2 relations: R1(C,D) and R2(A,B,C).'
}
);

window.GATE_DATA.questions['dbms'].topics.find(function(t){return t.id==='dbms-indexing';}).questions.push(
{
  id: 'dbms-indexing-y1',
  q: 'Which of the following statements about dense, sparse, and clustering indexes are TRUE? (Select ALL that apply)',
  options: [
    'A dense index has one index entry for every distinct search key value present in the data file',
    'A sparse index can be built only on a data file that is physically ordered (sorted) on the indexing attribute',
    'A clustering index requires the underlying data file to be physically sorted on the indexing attribute',
    'A secondary index built on a non-ordering field is typically sparse in order to save storage space'
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is true: this is the defining property of a dense index - every distinct value of the search key that occurs in the file gets its own index entry, allowing direct lookup without scanning. Option B is true: a sparse index stores entries only for some records (typically one per block), so it can only locate the right neighborhood; the actual target record is then found by scanning forward, which is only correct if the file is physically sorted on that attribute. Option C is true: a clustering index is defined on the field that determines the physical, sorted order of the data file itself - by definition, this requires the file to actually be maintained in sorted order on that field. Option D is false: since a secondary index is built on a non-ordering field, the data file is NOT sorted on that field, so a sparse index (which relies on sequential scanning after locating the approximate block) cannot correctly locate records - secondary indexes must therefore be dense to guarantee every record can be found directly.'
},
{
  id: 'dbms-indexing-y2',
  q: 'Which of the following statements about B+-tree and B-tree index structures are TRUE? (Select ALL that apply)',
  options: [
    'In a B+-tree, all actual record pointers reside only in the leaf nodes, while internal nodes store only routing (copy) keys',
    'A B-tree stores data pointers in both internal nodes and leaf nodes, unlike a B+-tree which reserves them for leaves only',
    'Leaf nodes in a B+-tree are typically linked together in a sequence to support efficient range queries',
    'For the same node capacity, a B+-tree internal node has a smaller fan-out than an equivalent B-tree internal node, because B+-trees duplicate keys'
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is true: this is the core structural distinction of a B+-tree - internal nodes exist purely to guide the search (holding copies of keys as separators), while every actual data/record pointer is stored exclusively at the leaf level. Option B is true: a classical B-tree stores a data pointer alongside every key at every level (internal or leaf), so a search can terminate early at an internal node, whereas a B+-tree always descends all the way to a leaf. Option C is true: B+-tree leaves are chained together via next-leaf pointers specifically so that, once a range query locates the starting leaf, all subsequent qualifying records can be retrieved by following leaf links sequentially rather than re-traversing the tree. Option D is false: because B+-tree internal nodes store ONLY keys (no data pointers), each internal node can pack in more keys per unit of node size compared to a B-tree internal node (which must also reserve space for data pointers) - this actually gives B+-trees a HIGHER fan-out, not a lower one, which is precisely why B+-trees are preferred for disk-based indexing.'
},
{
  id: 'dbms-indexing-y3',
  q: 'Which of the following statements about hashing and multilevel indexes are TRUE? (Select ALL that apply)',
  options: [
    'In static hashing, the number of buckets is fixed at the time the file is created',
    'Extendible hashing uses a directory of pointers to buckets, and this directory can double in size to resolve bucket overflow',
    'A multilevel index reduces the number of disk I/Os needed for a search compared to an equivalent single-level index over the same data',
    'Hashing is generally more efficient than a B+-tree index for answering range queries (e.g. retrieving all keys between 10 and 50)'
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is true: static hashing fixes the number of buckets (and hence the hash function\'s range) at file-creation time, which is exactly why it suffers from overflow chains as the file grows - it cannot adapt bucket count without a full reorganization. Option B is true: extendible hashing keeps a directory of 2^d pointers (d = global depth) to buckets; when a bucket overflows and its local depth equals the global depth, the directory doubles in size so it can distinguish the split buckets with one more bit. Option C is true: a multilevel index recursively indexes the index itself, so that instead of one large linear scan/binary search over a big first-level index, the search descends through a small number of small levels, each fitting in one disk block - this cuts down the number of block accesses needed. Option D is false: hashing scatters keys pseudo-randomly across buckets specifically to give fast O(1) point lookups, which destroys any notion of key ordering - so a range query using a hash index must essentially scan all buckets, making it far worse than a B+-tree, whose sorted leaf chain directly supports efficient range retrieval.'
},
{
  id: 'dbms-indexing-y4',
  q: 'A B+-tree has order p = 5, meaning each node can have at most 5 child pointers. What is the maximum number of keys that can be stored in a single leaf node? (Enter your numerical answer.)',
  options: [],
  answer: 4,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'For a B+-tree of order p, a leaf node holds at most (p - 1) keys, since a leaf does not need the extra tree-pointer slot that internal nodes reserve for the (p)-th child - it instead uses its last slot for the next-leaf chaining pointer, still yielding p - 1 data-key slots. With p = 5, the maximum number of keys per leaf is 5 - 1 = 4.'
},
{
  id: 'dbms-indexing-y5',
  q: 'For the same B+-tree of order p = 5, what is the minimum number of child pointers required in a non-root internal node (to satisfy the B+-tree occupancy rule)? (Enter your numerical answer.)',
  options: [],
  answer: 3,
  kind: 'nat',
  marks: 1,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'The B+-tree occupancy rule requires every non-root internal node to be at least half full: it must have at least ceil(p / 2) child pointers, where p is the order (maximum pointers). With p = 5, ceil(5 / 2) = ceil(2.5) = 3. So a non-root internal node must have at least 3 child pointers (and correspondingly at least 2 keys, one fewer than the pointer count).'
},
{
  id: 'dbms-indexing-y6',
  q: 'A B+-tree of order p = 5 has leaves that can each hold at most 4 keys (as computed above). If the tree must index exactly 100 records, and every leaf except possibly the last is packed to its maximum capacity, what is the minimum number of leaf nodes required? (Enter your numerical answer.)',
  options: [],
  answer: 25,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Each leaf holds at most 4 keys (one entry per indexed record), and packing leaves as full as possible minimizes their count. The minimum number of leaves needed is ceil(total records / max keys per leaf) = ceil(100 / 4) = ceil(25) = 25. Since 100 divides evenly by 4 (25 x 4 = 100 exactly), all 25 leaves can be completely full with no partially filled leaf needed, confirming the minimum is exactly 25.'
}
);

window.GATE_DATA.questions['dbms'].topics.find(function(t){return t.id==='dbms-transactions';}).questions.push(
{
  id: 'dbms-transactions-y1',
  q: 'Which of the following statements about the ACID properties of transactions are TRUE? (Select ALL that apply)',
  options: [
    'Atomicity ensures that a transaction is executed completely (all its operations) or not at all',
    'Durability guarantees that once a transaction commits, its effects survive any subsequent system crash',
    'Isolation guarantees that concurrent transactions produce a result equivalent to some serial execution, and this is achieved solely as a side effect of Atomicity',
    'Consistency means a transaction, if run alone starting from a consistent database state, leaves the database in a consistent state when it finishes'
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is true: this is the definition of atomicity - a transaction is treated as a single indivisible unit, so the system guarantees either full commit of every operation or a complete rollback with no partial effects visible. Option B is true: durability specifically concerns post-commit guarantees - once the commit is acknowledged, the changes are persisted (typically via write-ahead logging) so they survive crashes, power loss, or restarts. Option C is false: isolation is a distinct property from atomicity and is enforced by concurrency control mechanisms (locking, timestamp ordering, MVCC, etc.), not as an automatic byproduct of atomicity - a system could guarantee atomicity of individual transactions while still allowing interleaved execution that violates isolation (e.g. dirty reads) if no concurrency control were applied. Option D is true: this is precisely the consistency property - it is defined relative to a transaction executed in isolation, requiring only that consistent-in implies consistent-out; maintaining consistency under concurrent execution is the job of isolation, not consistency itself.'
},
{
  id: 'dbms-transactions-y2',
  q: 'Which of the following statements about locking-based concurrency control protocols are TRUE? (Select ALL that apply)',
  options: [
    'Strict Two-Phase Locking (Strict 2PL) releases all of a transaction\'s locks only at commit or abort time',
    'Two-Phase Locking (2PL) guarantees conflict serializability but does not, by itself, prevent deadlocks',
    'Under 2PL, a transaction is permitted to acquire a brand-new lock after it has already released some other lock',
    'Strict 2PL prevents cascading rollbacks (cascading aborts) from occurring'
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is true: this is the defining feature of Strict 2PL - all exclusive (and typically all) locks are held until the transaction actually commits or aborts, rather than being released as soon as they are logically no longer needed. Option B is true: 2PL (having a growing phase where locks are only acquired, followed by a shrinking phase where locks are only released) guarantees that the resulting schedules are conflict serializable, but it says nothing about preventing transactions from waiting on each other in a cycle, so deadlocks remain possible and must be handled separately (detection or prevention schemes). Option C is false: this directly violates the two-phase rule that defines 2PL - once a transaction releases even a single lock, it enters the shrinking phase and is forbidden from acquiring any further new locks; allowing this would forfeit the serializability guarantee. Option D is true: because Strict 2PL holds all locks (including write locks) until commit, no other transaction can ever read or overwrite an uncommitted (dirty) value, which eliminates the very dependency that causes cascading rollbacks.'
},
{
  id: 'dbms-transactions-y3',
  q: 'Which of the following statements about serializability and recoverability of schedules are TRUE? (Select ALL that apply)',
  options: [
    'A schedule is conflict serializable if and only if its precedence (serialization) graph is acyclic',
    'Every conflict-serializable schedule is also view-serializable, since view serializability is a strictly more general (less restrictive) condition',
    'A recoverable schedule requires that a transaction commits only after every transaction whose changes it read has already committed',
    'Every serial schedule (one with no interleaving of operations from different transactions) can fail to be recoverable'
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is true: this is the standard theorem connecting the two notions - building the precedence graph from all conflicting operation pairs and checking it for cycles is exactly the algorithmic test for conflict serializability; acyclic means serializable, a cycle means not. Option B is true: conflict serializability is a sufficient but not necessary condition for view serializability - every conflict-serializable schedule is automatically view-serializable, but there exist view-serializable schedules (typically involving blind writes) that are not conflict-serializable, making view serializability the strictly larger, more permissive class. Option C is true: this is exactly the definition of recoverability - it prevents a scenario where a transaction commits after reading a value from a transaction that later aborts, which would leave no way to undo the already-committed reader\'s effects. Option D is false: a serial schedule has absolutely no interleaving between transactions, so a transaction only ever reads data from transactions that have already fully completed (committed or aborted) before it even begins - there is no possibility of reading an uncommitted value, so every serial schedule is trivially and always recoverable.'
},
{
  id: 'dbms-transactions-y4',
  q: 'How many distinct serial schedules are possible for a set of 4 transactions T1, T2, T3, and T4 (each executed in full, one after another, in some order)? (Enter your numerical answer.)',
  options: [],
  answer: 24,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'A serial schedule for n transactions corresponds to one full permutation (ordering) of those n transactions, since each transaction runs to completion before the next begins. The number of distinct permutations of 4 transactions is 4! = 4 x 3 x 2 x 1 = 24. Hence there are 24 distinct serial schedules for T1, T2, T3, T4.'
},
{
  id: 'dbms-transactions-y5',
  q: 'Consider the schedule S with operations in this order: (1) R1(A), (2) W2(A), (3) R1(B), (4) W2(B), (5) R3(A). How many conflicting pairs of operations does S contain, where a conflicting pair is defined as two operations from DIFFERENT transactions accessing the SAME data item, with at least one of them being a write? (Enter your numerical answer.)',
  options: [],
  answer: 3,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'List operations by data item. Item A is touched by: R1(A) [op 1], W2(A) [op 2], R3(A) [op 5]. Check each cross-transaction pair on A: (op1,op2)=R1(A)-W2(A): different transactions (T1,T2), one is a write -> conflict. (op1,op5)=R1(A)-R3(A): different transactions but BOTH are reads -> not a conflict (read-read never conflicts). (op2,op5)=W2(A)-R3(A): different transactions (T2,T3), one is a write -> conflict. Item B is touched by: R1(B) [op 3], W2(B) [op 4]. Check: (op3,op4)=R1(B)-W2(B): different transactions (T1,T2), one is a write -> conflict. Total conflicting pairs = (op1,op2) + (op2,op5) + (op3,op4) = 3.'
},
{
  id: 'dbms-transactions-y6',
  q: 'Consider schedule S with operations in order: (1) R1(A), (2) W2(A), (3) R1(B), (4) W3(B), (5) R2(C), (6) R3(D), running transactions T1, T2, T3. Build the precedence graph from all conflicting operation pairs, then count how many total orderings (serial schedules) of T1, T2, T3 are consistent with that precedence graph. (Enter your numerical answer.)',
  options: [],
  answer: 2,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Build the precedence graph by finding all cross-transaction conflicts. Item A: R1(A) [op1] and W2(A) [op2] - different transactions, one write, op1 before op2 -> edge T1 -> T2. Item B: R1(B) [op3] and W3(B) [op4] - different transactions, one write, op3 before op4 -> edge T1 -> T3. Item C: only R2(C) [op5] appears - no other transaction touches C, so no conflict. Item D: only R3(D) [op6] appears - no other transaction touches D, so no conflict. T2 and T3 share no common data item (T2 touches A and C; T3 touches B and D), so there is no edge between T2 and T3 either direction. The precedence graph is therefore: T1 -> T2 and T1 -> T3, with no edge between T2 and T3 - this is acyclic, so S is conflict serializable. Counting valid topological orders: T1 must come first (it has incoming edges from nothing but points to both others), and then T2, T3 can appear in either relative order since they are unconstrained with respect to each other. This gives exactly 2 valid total orderings: T1,T2,T3 and T1,T3,T2.'
}
);
