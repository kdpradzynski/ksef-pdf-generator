import { Content, ContentText } from 'pdfmake/interfaces';
import { formatText } from '../../../shared/PDF-functions';
import { Fa as Fa3 } from '../../types/fa3.types';
import FormatTyp from '../../../shared/enums/common.enum';

export function generateTest(): Content[] {
  return [
    formatText('FormatTyp.Bold: Pchnąć w tę łódź jeża lub ośm skrzyń fig', FormatTyp.Bold) as ContentText,
    formatText(
      'FormatTyp.Boolean: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.Boolean
    ) as ContentText,
    formatText(
      'FormatTyp.Currency: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.Currency
    ) as ContentText,
    formatText(
      'FormatTyp.CurrencyAbs: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.CurrencyAbs
    ) as ContentText,
    formatText(
      'FormatTyp.CurrencyGreater: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.CurrencyGreater
    ) as ContentText,
    formatText(
      'FormatTyp.Currency6: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.Currency6
    ) as ContentText,
    formatText(
      'FormatTyp.Default: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.Default
    ) as ContentText,
    formatText(
      'FormatTyp.Description: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.Description
    ) as ContentText,
    formatText(
      'FormatTyp.GrayBoldTitle: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.GrayBoldTitle
    ) as ContentText,
    formatText('FormatTyp.Label: Pchnąć w tę łódź jeża lub ośm skrzyń fig', FormatTyp.Label) as ContentText,
    formatText(
      'FormatTyp.LabelMedium: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.LabelMedium
    ) as ContentText,
    formatText(
      'FormatTyp.LabelMargin: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.LabelMargin
    ) as ContentText,
    formatText(
      'FormatTyp.LabelSmallMargin: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.LabelSmallMargin
    ) as ContentText,
    formatText(
      'FormatTyp.LabelGreater: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.LabelGreater
    ) as ContentText,
    formatText('FormatTyp.Link: Pchnąć w tę łódź jeża lub ośm skrzyń fig', FormatTyp.Link) as ContentText,
    formatText(
      'FormatTyp.MarginBottom4: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.MarginBottom4
    ) as ContentText,
    formatText(
      'FormatTyp.MarginBottom8: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.MarginBottom8
    ) as ContentText,
    formatText(
      'FormatTyp.MarginTop4: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.MarginTop4
    ) as ContentText,
    formatText(
      'FormatTyp.MarginTop8: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.MarginTop8
    ) as ContentText,
    formatText('FormatTyp.Value: Pchnąć w tę łódź jeża lub ośm skrzyń fig', FormatTyp.Value) as ContentText,
    formatText(
      'FormatTyp.ValueMedium: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.ValueMedium
    ) as ContentText,
    formatText(
      'FormatTyp.GrayTitle: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.GrayTitle
    ) as ContentText,
    formatText(
      'FormatTyp.HeaderContent: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.HeaderContent
    ) as ContentText,
    formatText(
      'FormatTyp.SubHeaderContent: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.SubHeaderContent
    ) as ContentText,
    formatText(
      'FormatTyp.TitleContent: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.TitleContent
    ) as ContentText,
    formatText(
      'FormatTyp.HeaderPosition: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.HeaderPosition
    ) as ContentText,
    formatText('FormatTyp.Right: Pchnąć w tę łódź jeża lub ośm skrzyń fig', FormatTyp.Right) as ContentText,
    formatText(
      'FormatTyp.DateTime: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.DateTime
    ) as ContentText,
    formatText('FormatTyp.Date: Pchnąć w tę łódź jeża lub ośm skrzyń fig', FormatTyp.Date) as ContentText,
    formatText('FormatTyp.Time: Pchnąć w tę łódź jeża lub ośm skrzyń fig', FormatTyp.Time) as ContentText,
    formatText(
      'FormatTyp.FormOfPayment: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.FormOfPayment
    ) as ContentText,
    formatText(
      'FormatTyp.Percentage: Pchnąć w tę łódź jeża lub ośm skrzyń fig',
      FormatTyp.Percentage
    ) as ContentText,
    formatText('FormatTyp.Number: Pchnąć w tę łódź jeża lub ośm skrzyń fig', FormatTyp.Number) as ContentText,
  ];
}
