import styled, { css } from 'styled-components'

export const TableLosses = styled.table`
  width: 100%;
  tbody,
  tr {
    display: block;
    &:not(:last-child) {
      margin-bottom: 10.5px;
    }
  }
  td {
    display: inline-block;
    width: 33%;
    &:nth-child(2) {
      text-align: center;
      p {
        font-weight: 400;
      }
    }
    &:last-child {
      text-align: right;
    }
    p.isRed {
      color: #f32943;
    }
  }
`

export const Flag = styled.span`
  display: inline-block;
  width: 13px;
  height: 13px;
  border-radius: 100px;
`

export const FlagUkraine = styled(Flag)`
  margin-right: 10.5px;
  background: linear-gradient(-180deg, royalblue 50%, yellow 50%);
}
`

export const FlagRussia = styled(Flag)`
  margin-left: 10.5px;
  background: linear-gradient(
    -180deg,
    white 33.3%,
    mediumblue 33.3%,
    mediumblue 66.6%,
    red 66.6%
  );
`
