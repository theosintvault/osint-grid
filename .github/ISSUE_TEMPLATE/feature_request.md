name: Feature request
about: Suggest an improvement or new capability for The OSINT Grid
title: ""
labels: enhancement
assignees: ""
body:
  - type: markdown
    attributes:
      value: |
        Thanks for suggesting an improvement.

  - type: textarea
    id: problem
    attributes:
      label: Problem or opportunity
      description: What gap, pain point, or opportunity are you addressing?
      placeholder: Describe the user need or project gap.
    validations:
      required: true

  - type: textarea
    id: proposal
    attributes:
      label: Proposed solution
      description: Outline your proposed approach or feature.
      placeholder: What would the ideal solution look like?
    validations:
      required: true

  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives considered
      description: List any alternatives or workarounds you considered.
      placeholder: Optional.
    validations:
      required: false

  - type: textarea
    id: additional
    attributes:
      label: Additional context
      description: Add references, examples, or notes that would help evaluation.
      placeholder: Optional.
    validations:
      required: false
