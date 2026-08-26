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
    }
]};
